import {createReadStream} from "fs";
const FormData = require('form-data'); // npm install --save form-data
import {getStorageAddress} from "./config";
import axios from 'axios';

export const uploadFile = async (path) => {
  const form = new FormData();
  form.append('file', createReadStream(path));

  const request_config = {
    headers: {
      ...form.getHeaders()
    }
  };

  console.log(getStorageAddress());

  return axios.post(`${getStorageAddress()}/file`, form, request_config);
}
