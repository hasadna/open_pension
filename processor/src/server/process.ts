import {Request, Response} from "express-serve-static-core";
import {FileModel, StatusProcessed, StatusProcessedWithErrors} from '../db/FileModel';
import * as path from "path";
import {getUploadedPath} from "../services/env";
import {excelParsing} from "../parse";

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

    let results;
    try {
        results = await excelParsing(path.join(getUploadedPath(), file.filename));
    } catch (e) {
        res.status(400).json({'error': e.message});
        return;
    }

    if (results.errors != []) {
        file.status = StatusProcessedWithErrors;
        file.parsingErrors = results.errors;
    } else {
        file.status = StatusProcessed;
    }

    file.results = results.data;
    file.save();

    res.status(201).json(file)
}
