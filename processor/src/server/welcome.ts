import {Request, Response} from "express-serve-static-core";

export function welcome(req: Request, res: Response) {
    res.send({status: 'alive'})
}
