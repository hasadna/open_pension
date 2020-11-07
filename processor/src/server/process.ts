import {Request, Response} from "express-serve-static-core";
import {FileModel, StatusProcessed, StatusProcessedWithErrors} from '../db/FileModel';
import * as path from "path";
import {getUploadedPath} from "../services/env";
import {singleAssetProcess} from "../parse";
import {Model} from "mongoose";


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

export const processingFile = async (file: any, catchCallback = null) => {
    let results;
    try {
        results = await singleAssetProcess(path.join(getUploadedPath(), file.filename));
    } catch (e) {

        if (catchCallback) {
            catchCallback(e);
        }

        return;
    }

    file.status = StatusProcessed;

    if (results.errors.length > 0) {
        // Whoops. Got some errors. Change the process status and add the errors.
        file.status = StatusProcessedWithErrors;
        file.parsingErrors = results.errors;
    }

    file.results = results.data;
    file.save();
};
