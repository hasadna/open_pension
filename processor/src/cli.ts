import {createInterface} from "readline";
import * as fs from "fs";
import * as path from "path";
import {performanceProcess, singleAssetProcess} from "./parse";
import * as colors from "colors";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const [type] = process.argv.slice(2);

const handleFile = async (processingType, filePath) => {

    if (processingType == 'single_asset') {
        const results = await singleAssetProcess(filePath)
        return results['data'];
    }

    if (processingType == 'performance') {
        const results = await performanceProcess(filePath)
        return results['data'];
    }
};


const handleFiles = async (sourceDirectory, destination, results) => {
    let index = 1;
    const files = fs.readdirSync(sourceDirectory);

    return Promise.all(files.map(async (filename) => {
        return new Promise(async (resolve) => {
            console.log(colors.yellow(`Process the file ${filename}`));
            const destinationPath = path.join(destination, `${filename.split('.')[0]}.json`);

            if (fs.existsSync(destinationPath)) {
                results[filename] = "Skipped";
                console.log(colors.blue(`${filename} (${index++} / ${files.length}) skipped`));
            } else {
                try {
                    const processResults = await handleFile(type, path.join(sourceDirectory, filename));
                    fs.writeFileSync(destinationPath, JSON.stringify(processResults));
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
};

const handlingDirectory = async (userPathInput) => {
    if (fs.lstatSync(userPathInput).isDirectory()) {

        rl.question(colors.blue('Enter destination folder '), async (destination: string) => {

            if (!fs.existsSync(destination)) {
                fs.mkdirSync(destination);
                console.log(colors.magenta(`Destination folder ${destination} created`))
            }

            const results = {};
            await handleFiles(userPathInput, destination, results);
            console.log(results);
            console.log(colors.green("Completed!"))
            rl.close();
        });

    } else {
        const results = await handleFile(type, userPathInput);
        console.log(JSON.stringify(results));
    }
}

if (!type) {
    console.log(colors.red("You need to provide a process types: performance or single_asset"));
} else {
    rl.question(colors.blue("What's the path for the files, can be a single files or a list of folder? "), async (sourceDirectory: string) => {

        if (!fs.existsSync(sourceDirectory)) {
            console.error(`The path ${sourceDirectory} does not exists`);
            rl.close();
            return;
        }

        await handlingDirectory(sourceDirectory)
    });
}
