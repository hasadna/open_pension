import {chunk} from 'lodash';
import {readdirSync, existsSync, mkdirSync, writeFileSync} from 'fs';
import {basename, parse, join} from 'path';
import {freemem} from 'os';
import {performanceProcess, singleAssetProcess} from "./parse";
import * as colors from "colors";

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
    const filesChunks = 20;

    if (!existsSync(destination)) {
        mkdirSync(destination);
        console.log(colors.magenta(`Destination folder ${destination} created`))
    }

    // Get all the files we need to process.
    let filesFromSourceDirectory = await readdirSync(sourceDirectory);

    // Get all the files we processed.
    const filesFromDestination = await readdirSync(destination);

    // Clean the processed files the un-processed files and log it and Split the unprocessed files to chunks of 20.
    // todo: Filter is wrong, there are duplicate files!
    let filesToProcess = chunk(filesFromSourceDirectory.filter((file: string) => {
        const filename = basename(file);
        return !filesFromDestination.includes(`${parse(filename).name}.json`) || file === '.DS_Store';
    }), filesChunks);

    if (filesFromDestination.length > 0) {
        console.log(`${filesFromDestination.length} files were processed been processed: ${filesFromDestination.map(file => `${file}\n`)}`.yellow)
    } else {
        console.log('Starting to process all the files'.blue)
    }

    console.log(`Start to process ${filesToProcess.length} chunks of files.`.yellow.bgBlue);

   for (let files of filesToProcess) {
        for (let filename of files) {
            console.log(filename, freemem() / 1000);
            try {
                const processResults = await handleFile(type, join(sourceDirectory, filename));
                writeFileSync(join(destination, `${basename(filename)}.json`), JSON.stringify(processResults));
                results[filename] = "Passed";
            } catch (e) {
                console.error(filename, e);
                results[filename] = `Failed: ${e}`
            }

            global.gc();
        }

        console.log('-------');
    }

   console.log(results);

   return Promise.resolve();
};

const handlingDirectory = async () => {
    // todo: support argument and if arguments are not available ask for them.
    return await handleFiles("/Users/roysegall/Downloads/json_reports", "/Users/roysegall/Downloads/export", {});
}

if (!type) {
    console.log(colors.red("You need to provide a process types: performance or single_asset"));
} else {
    (async () => {
        await handlingDirectory();
    })()
}
