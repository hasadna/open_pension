import * as mongoose from "mongoose";
import { Client } from "pg";
import app from "./app";

const client = new Client();

client.connect()
    .then(() => {
        app.listen("3000", () => {
            console.log("Express server listening on port 3000");
        });
    })
    .catch((error) => {
        console.error(error);
    });

process.on("SIGINT", async () => {
    await mongoose.disconnect();
    console.log("Disconnecting");
    process.exit();
});

