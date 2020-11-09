import {Request, Response} from "express-serve-static-core";
import {FileModel, StatusProcessed, StatusProcessedWithErrors} from '../db/FileModel';
import * as path from "path";
import {
    getKafkaProcessCompletedTopic,
    getKafkaProcessCompletedWithErrorsTopic,
    getKafkaProcessStartedTopic,
    getUploadedPath
} from "../services/env";
import {singleAssetProcess} from "../parse";
import {KafkaClient} from "../services/kafka-client";


/**
 * Uploading files to the system.
 *
 * @param req
 * @param res
 */
export async function process(req: Request, res: Response) {
    let file = await FileModel.findById(req.params.object_id);

    if (!file) {
        res.json({'error': 'record was not found'})
        return;
    }

    await processingFile(file, (e) => {
        res.status(400).json({'error': e.message});
    })
    res.status(201).json(file);
}

export const processingFile = async (file: any, catchCallback = null, kafkaClient: KafkaClient = null) => {
    let results;

    const messagePayload = {
        storageId: file.storageId,
    };

    const sendMessage = (topic: string) => {
        if (!kafkaClient) {
            return;
        }

        kafkaClient.sendMessage(JSON.stringify(messagePayload), topic)
          .then(() => {
              console.log(`The event ${topic} for the file ${file.storageId} has been sent.`);
          });
    }

    try {
        sendMessage(getKafkaProcessStartedTopic());
        results = await singleAssetProcess(path.join(getUploadedPath(), file.filename), kafkaClient);
    } catch (e) {

        if (catchCallback) {
            catchCallback(e);
        }

        sendMessage(getKafkaProcessCompletedWithErrorsTopic());
        return;
    }

    if (results.errors.length > 0) {
        // Whoops. Got some errors. Change the process status and add the errors.
        file.status = StatusProcessedWithErrors;
        file.parsingErrors = results.errors;
        sendMessage(getKafkaProcessCompletedWithErrorsTopic());
    } else {
        file.status = StatusProcessed;
        sendMessage(getKafkaProcessCompletedTopic());
    }

    file.results = results.data;
    file.save();
};
