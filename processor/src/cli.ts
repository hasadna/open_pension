import {createInterface} from "readline";
import * as fs from "fs";
import * as path from "path";
import {excelParsing} from "./parse";
import * as colors from "colors";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.question(colors.blue("What's the path for the files, can be a single files or a list of folder? "), async (sourceDirectory: string) => {

    if (!fs.existsSync(sourceDirectory)) {
        console.error(`The path ${sourceDirectory} does not exists`);
        rl.close();
        return;
    }

    if (fs.lstatSync(sourceDirectory).isDirectory()) {

        rl.question(colors.blue('Enter destination folder '), async (destination: string) => {

            if (!fs.existsSync(destination)) {
                fs.mkdirSync(destination);
                console.log(colors.magenta(`Destination folder ${destination} created`))
            }

            await Promise.all(fs.readdirSync(sourceDirectory).map(async (filename) => {
                return new Promise(async (resolve) => {
                    console.log(colors.yellow(`Process the file ${filename}`));

                    const results = await excelParsing(path.join(sourceDirectory, filename));
                    fs.writeFileSync(path.join(destination, `${filename.split('.')[0]}.json`), JSON.stringify(results));

                    console.log(colors.green(`Done processing the file ${filename}`));
                    resolve();
                });

            }));

            rl.close();

        });

    } else {
        const results = await excelParsing(sourceDirectory);
        console.log(JSON.stringify(results));
    }
});
