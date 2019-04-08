import { exec } from "child_process";
import { MigrationError } from "../errors";

export async function migrateDB() {
    await new Promise((resolve, reject) => {
        const migrate = exec(
            "sequelize db:migrate",
            {env: process.env},
            (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            },
        );

        // Forward stdout+stderr to this process
        if (migrate.stdout && migrate.stderr) {
            migrate.stdout.pipe(process.stdout);
            migrate.stderr.pipe(process.stderr);
        } else {
            throw new MigrationError("Could not connect to migrate process");
        }
    });
}
