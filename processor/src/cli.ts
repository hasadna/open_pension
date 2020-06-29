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

            const results = {};
            let index = 1;
            const files = fs.readdirSync(sourceDirectory);

            await Promise.all(files.map(async (filename) => {
                return new Promise(async (resolve) => {
                    console.log(colors.yellow(`Process the file ${filename}`));
                    const destinationPath = path.join(destination, `${filename.split('.')[0]}.json`);

                    if (fs.existsSync(destinationPath)) {
                        results[filename] = "Skipped";
                        console.log(colors.blue(`${filename} (${index++} / ${files.length}) {len skipped`));
                    } else {
                        try {
                            const results = await excelParsing(path.join(sourceDirectory, filename));
                            fs.writeFileSync(destinationPath, JSON.stringify(results['data']));
                            console.log(colors.green(`${filename} (${index++} / ${files.length}) processed`));
                            results[filename] = "Passed";
                        } catch (e) {
                            console.log(colors.red(`${filename} (${index++} / ${files.length}) error`));
                            console.error(filename, e);
                            results[filename] = `Failed: ${e}`
                        }
                    }

                    resolve();
                });

            }));

            console.log(results);
            console.log(colors.green("Completed!"))
            rl.close();
        });

    } else {
        const results = await excelParsing(sourceDirectory);
        console.log(JSON.stringify(results));
    }
});
