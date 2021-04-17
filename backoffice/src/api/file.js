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

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const axios = getAxios();
  return await axios.post('/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
