import {Request, Response} from "express-serve-static-core";
import {FileModel, StatusNew} from 'db/FileModel';
import {Document} from "mongoose";

/**
 * Uploading files to the system.
 *
 * @param req
 * @param res
 */
export async function uploadFile(req: Request, res: Response) {
    res.json(await Promise.all(req.body.uploadedFiles.map(async (filename: string) => {
        return new Promise((resolve) => {
            const fileData = {'filename': filename, 'status': StatusNew};
            const file = new FileModel(fileData);

            file.save().then((record: Document) => {
                resolve({
                    id: record._id.toString(),
                    ...fileData
                });
            });
        });
    })));
}
