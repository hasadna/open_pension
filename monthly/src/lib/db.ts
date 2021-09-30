import {PrismaClient} from "@prisma/client"
import {isEmpty} from "lodash";
import {
  File,
  FileMetadata,
  FileRowInterface,
  FileStatus,
  ProcessState
} from "./interfaces";
import {processFile} from "./file";
import {log} from 'open-pension-logger';

async function updateFileStatus(file: File, status: FileStatus, prisma: PrismaClient, error = null) {
  let data: object = {};
  if (status == FileStatus.Failed) {
    data = {status, error}
  }
  else {
    data = {status, error: ""};
  }

  // We failed, we need to update the file in the DB.
  await prisma.file.update({
    where: {ID: file.ID},
    data,
  });
}

export async function processFilesToRows(file: File, prisma: PrismaClient): Promise<ProcessState> {
  const {status, payload, message: error} = await processFile(file.path);

  if (!isEmpty(payload)) {
    log({text: `Inserting the results for ${file.filename} to the DB.`})

    const baseData: any = {
      file: {connect: {ID: file.ID}},
      created: new Date(),
    };

    try {
      await Promise.all(payload.map(async (processedFileRow) => {
        const combined = {...baseData, ...processedFileRow};
        // @ts-ignore
        await prisma.row.create({data: combined});
      }));
    } catch (error) {
      log({text: `Failed parsing the file ${file.filename} with the error`, error}, 'error')
    }
  } else {
    log({text: `There are no rows for the file ${file.filename}. Update the file as success anyway.`}, 'warning');
  }

  const newFileStatus = status == ProcessState.Failed ? FileStatus.Failed : FileStatus.Succeeded;
  await updateFileStatus(file, newFileStatus, prisma, error);
  return status;
}

async function getManagerData(managerID: number, prisma: PrismaClient): Promise<object> {
  const fund = await prisma.fund.findFirst({
    where: {
      ID: managerID,
    },
    select: {
      status: true,
      channel: true,
      subChannel: true,
      fundName: true,
      type: true,
      passiveActive: true,
      homebase: true,
      managingBody: true,
    },
  });

  const parsedFund = {};

  if (!isEmpty(fund)) {
    Object.entries(fund).map(([key, value]) => {
      parsedFund[key] = !isEmpty(value) ? value['label'] : null;
    });
  }

  return parsedFund;
}

export async function getFileMetadata(storageID: number, prisma: PrismaClient): Promise<FileMetadata> {
  const results = await prisma.file.findFirst({
      where: {storageID},
      select: {
        error: true,
        rows: true,
      },
    },
  );

  if (isEmpty(results)) {
    return {
      error: '',
      numberOfRows: 0,
      fileRows: [],
    };
  }

  const {error, rows} = results;

  const keys = [
    'row_ID',
    'MANAGER_ID',
    'ALPHA_SHNATI',
    'SHARP_RIBIT_HASRAT_SIKUN',
    'STIAT_TEKEN_60_HODASHIM',
    'STIAT_TEKEN_36_HODASHIM',
    'TSUA_SHNATIT_MEMUZAAT_5_SHANIM',
    'TSUA_SHNATIT_MEMUZAAT_3_SHANIM',
    'TSUA_MITZTABERET_60_HODASHIM',
    'TSUA_MITZTABERET_36_HODASHIM',
    'TSUA_MEMUZAAT_60_HODASHIM',
    'TSUA_MEMUZAAT_36_HODASHIM',
    'TSUA_MITZT_MI_THILAT_SHANA',
    'YITRAT_NCHASIM_LSOF_TKUFA',
    'TSUA_NOMINALIT_BRUTO_HODSHIT',
    'TKUFAT_DIVUACH',
    'missingReclamationData',
  ];

  const memoManagers = {};

  return {
    error: error,
    numberOfRows: rows.length,
    fileRows: await Promise.all(rows.map(async (row: Partial<FileRowInterface>) => {
      const returnedValue = {};

      keys.map((key) => {
        returnedValue[key] = row[key];
      });

      const managerID = returnedValue['MANAGER_ID'];
      let managerData;
      if (Object.keys(memoManagers).includes(managerID)) {
        managerData = memoManagers[managerID];
      } else {
        managerData = await getManagerData(returnedValue['MANAGER_ID'], prisma);
        memoManagers[managerID] = managerData;
      }

      returnedValue['managerMetadata'] = managerData;

      return returnedValue;
    })),
  };
}
