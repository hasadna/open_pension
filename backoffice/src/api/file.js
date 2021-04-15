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

  const query = `
    mutation($upload: Upload!) {
      fileCreate(file: $upload)
    }
  `;

  const variables = {
    upload: null,
  };

  const operations = JSON.stringify({ query, variables });
  formData.append("operations", operations);

  const map = {
    "0": ["variables.upload"]
  };

  formData.append("map", JSON.stringify(map));
  formData.append("0", file);

  const axios = getAxios();
  return await axios.post('', formData);
}
