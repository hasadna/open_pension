import * as colors from "colors";
import fs from "fs";
import path from "path";
import {singleAssetProcess} from "parse";

function getExecutor(filename: string, destination: string, results: {}, index: number, files: string[], sourceDirectory) {
    return async (resolve) => {
        console.log(colors.yellow(`Process the file ${filename}`));
        const destinationPath = path.join(destination, `${filename.split('.')[0]}.json`);

        if (fs.existsSync(destinationPath)) {
            results[filename] = "Skipped";
            console.log(colors.blue(`${filename} (${index++} / ${files.length}) {len skipped`));
        } else {
            try {
                const results = await singleAssetProcess(path.join(sourceDirectory, filename));
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
    };
}

export const folderHandler = (rl, sourceDirectory) => {

    rl.question(colors.blue('Enter destination folder '), async (destination: string) => {

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
            console.log(colors.magenta(`Destination folder ${destination} created`))
        }

        const results = {};
        let index = 1;
        const files = fs.readdirSync(sourceDirectory);

        await Promise.all(files.map(async (filename) => {

            return new Promise(getExecutor(filename, destination, results, index, files, sourceDirectory));

        }));

        console.log(results);
        console.log(colors.green("Completed!"))
        rl.close();
    });
};
