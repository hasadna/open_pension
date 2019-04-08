import { Sequelize } from "sequelize";
import { InstrumentsModel } from "../components/instruments";
import { retry } from "../utils/asyncUtils";
import { DBConnectionError, MigrationError, NoDbParamsError } from "./errors";
import { migrateDB } from "./utils/migrateDB";

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
        await retry(async () => sequelize.authenticate(), 5, 2000);
        console.log("Database Connection has been established successfully.");
    } catch (err) {
        const dbErr = new DBConnectionError("Unable to connect to the database:");
        console.error(dbErr, err);
        throw dbErr;
    }

    // DB migration.
    await migrateDB();

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
