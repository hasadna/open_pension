import {Request, Response} from "express-serve-static-core";
import {FileModel} from '../db/FileModel';

/**
 * Uploading files to the system.
 *
 * @param req
 * @param res
 */
export async function results(req: Request, res: Response) {
    try {
        let file = await FileModel.findById(req.params.object_id);
        res.json(file)
    } catch (e) {
        console.log(`Error while loading a file record: ${e}`);
    }
}
