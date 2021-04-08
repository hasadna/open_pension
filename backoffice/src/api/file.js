import axios from "axios";
import {sendQuery, STORAGE_URL} from "./core";

export async function getFiles() {
  const results = await sendQuery(`
    query {
      files {
        id
        filename
        status
        storageId
      }
    }
  `);
  const {data: {files: data}, error} = results;
  return {data, error}
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file',file);

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  const {data: {ID, filename}} = await axios.post(`${STORAGE_URL}/file`, formData, config);
  await sendQuery(`
    mutation {
      fileCreate(filename: "${filename}", storageId: ${ID}, status: "stored") {
        id
      }
    }
  `);
}