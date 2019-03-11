import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import GeneralController from "./Controllers/GeneralController";

const port = process.env.PORT || "80";

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.setUp();
    }

    private setUp(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Adding productSchema routes.
        this.app.use("/", new GeneralController().router);
    }
}

export default new App().app;
