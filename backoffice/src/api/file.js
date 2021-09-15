import {sendQuery, getAxios} from "./core";

export async function getFiles({itemsPerPage = 5, page = 0, queryParams = {}}) {
  const {filename} = queryParams;
  let filesArgs = `pagination: {itemsNumber: ${itemsPerPage}, page: ${page}}`;

  if (filename) {
    filesArgs = `${filesArgs}, filter:[{key: "filename", value: "${filename}", operation: CONTAINS}]`
  }

  const results = await sendQuery(`
    query {
      files(${filesArgs}) {
        files {
          id
          filename
          status
          storageId
        },
        totalCount
      }
    }
  `);
  const {data: {files: data}, error} = results;
  return {data, error}
}

export async function getFile(id) {
  const results = await sendQuery(`
    query {
      file(id: "${id}") {
        filename,
        status,
        createdAt,
        extra
      }
    }
  `);

  const {data: {file: file}} = results;

  return file;
}

export async function uploadFile(files) {
  const formData = new FormData();

  for (let file of files) {
    formData.append("files", file);
  }

  const axios = getAxios('/', false);
  return await axios.post('/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
