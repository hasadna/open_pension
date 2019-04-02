import { Sequelize } from "sequelize";
import { InstrumentsModel } from "../components/instruments";
import { NoDbParamsError } from "./errors";

const db = process.env.POSTGRES_DB || "";
const user = process.env.POSTGRES_USER || "";
const password = process.env.POSTGRES_PASSWORD || "";
const host = process.env.POSTGRES_HOST || "";

if (!db || !user || !password || !host) {
    throw new NoDbParamsError(`One or more of the database environment variables are missing.
Env vars are: ${JSON.stringify({ db, user, password, host })}`);
}

const models = [
    InstrumentsModel,
];

export async function initSequelize() {
    const sequelize = new Sequelize(db, user, password, {
        host,
        dialect: "postgres",
    });

    try {
        await sequelize.authenticate();
        console.log("Database Connection has been established successfully.");
    } catch (err) {
        console.error("Unable to connect to the database:", err);
    }

    // Initialize models.
    for (const model of models) {
        try {
            model.initModel(sequelize);
            console.log(`Model ${model.name} has been successfully initialized.`);
        } catch (err) {
            console.error(`Unable to initialize the model ${model.name}`, err);
        }
    }

}
