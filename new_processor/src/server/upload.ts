import {Request, Response} from "express-serve-static-core";

/**
 * Uploading files to the system.
 *
 * @param req
 * @param res
 */
export function uploadFile(req: Request, res: Response) {
    res.json(req.body.uploadedFiles.map((item: any) => {
        // todo: create a record in mongoDB.
        return {filename: item, id: ''}
    }))
}
