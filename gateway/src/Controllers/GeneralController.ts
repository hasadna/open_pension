import * as express from "express";
import BaseController from "../Base/BaseController";

export default class GeneralController extends BaseController {

    /**
     * Defining the routes.
     */
    public routes() {
        this.router.get("/", async (req: express.Request, res: express.Response) => {
            res.status(200).send({status: "working"});
        });
    }
}
