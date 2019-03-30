import * as express from "express";
import { Client } from "pg";

const server = express();
const client = new Client();

const PORT = 3000;

client.connect();

// pg.connect("postgres://postgres:password@database:5432/blop");

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

server.get("/", (req, res) => res.status(200).send("hello"));
