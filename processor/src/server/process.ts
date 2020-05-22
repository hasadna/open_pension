import {Request, Response} from "express-serve-static-core";
import {FileModel, StatusProcessed} from '../db/FileModel';
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
    try {
        let file = await FileModel.findById(req.params.object_id);

        if (!file) {
            res.json({'error': 'record was not found'})
            return;
        }

        file.status = StatusProcessed;
        file.results = await excelParsing(path.join(getUploadedPath(), file.filename));
        file.save();

        res.json(file)
    } catch (e) {
        console.log(`Error while loading a file record: ${e}`);
    }
}
