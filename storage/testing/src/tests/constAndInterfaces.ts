import {join} from "path";

export const FILES_QUERY = `
  query {
    files {
      id
      filename
      path
    }
  }
`

export const FILE_QUERY = (id: number) => `
  query {
    file(id: ${id}) {
      filename
      path
    }
  }
`

export type FileFromResponse = {
  id: string,
  path: string,
  filename: string
}

export type FilesResponse = {
  data: {
    data: {
      files: FileFromResponse[]
    }
  }
}

export type FileResponse = {
  data: {
    data: {
      file: FileFromResponse
    }
  }
}

export type AssertFileDataArgs = {
  id: number,
  expectedFilename: string|null,
  expectedPath: string|null
};

export type  FileCreateType = {
  filename: string,
  path: string
}

export const catImageOriginPath = join(process.cwd(), 'src', 'tests', 'assets', 'cat.png');
export const catImageDestinationPath = join(process.cwd(), '../', '../', 'data', 'files', 'storage', 'cat.png');

export const xmlFileOriginPath = join(process.cwd(), 'src', 'tests', 'assets', 'animals.xml');
export const xmlFileDestinationPath = join(process.cwd(), '../', '../', 'data', 'files', 'storage', 'animals.xml');
export const zipFile = join(process.cwd(), 'src', 'tests', 'assets', 'zipWithFiles.zip');
