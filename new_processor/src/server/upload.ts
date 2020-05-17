import {Request, Response} from "express-serve-static-core";
import {FileModel, StatusNew} from '../db/FileModel';

/**
 * Uploading files to the system.
 *
 * @param req
 * @param res
 */
export async function uploadFile(req: Request, res: Response) {
    res.json(await Promise.all(req.body.uploadedFiles.map(async (filename: any) => {
        return new Promise((resolve) => {
            const fileData = {'filename': filename, 'status': StatusNew};
            const file = new FileModel(fileData);

            file.save().then((record:any) => {
                resolve({
                    id: record._id.toString(),
                    ...fileData
                });
            });
        });
    })));
}
