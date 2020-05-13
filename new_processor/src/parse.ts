const readXlsxFile = require('read-excel-file/node');

async function processSheet(path: any, sheetName: any): Promise<any> {

    //  const sheets = await readXlsxFile(path, { sheet: sheetName }).then((data: any) => {
    //     console.log(data);
    // });

    return new Promise(async (resolve, reject) => {
        setTimeout(() => {
            resolve('Yay!');
        }, 3000);
    });
}

export async function excelParsing(path: string) {
    const sheets = await readXlsxFile(path, { getSheets: true });

    await Promise.all(sheets.map(async (item: any) => {
        await processSheet(path, item.name);
    }));
}
