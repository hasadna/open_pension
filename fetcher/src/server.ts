import express from "express";
import "express-async-errors";
require("dotenv").config();

import reportsHandler from "./handlers/reports-handler";

const app = express();
const port = parseInt(process.env.PORT);

app.get("/reports", reportsHandler);

app.listen(port, () => console.log(`Fetcher listening on port ${port}!`));
