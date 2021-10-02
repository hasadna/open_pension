import axios from 'axios';
import {prisma} from "../server/context";
import {FileCreateType, FileResponse, FilesResponse} from "./constAndInterfaces";
import {createReadStream} from "fs";
const FormData = require('form-data'); // npm install --save form-data

export function getAxios() {
  return axios.create({
    baseURL: 'http://localhost:7000',
  });
}

export const fileCreate = async (data: FileCreateType) => await prisma.file.create({data,});
export const sendGraphQLQuery = async (query: string): Promise<FileResponse|FilesResponse> => getAxios().post(`/graphql`, {query});

export const uploadFile = async (paths: string[]) => {
  const form = new FormData();
  paths.forEach(path => form.append('file', createReadStream(path)));

  const request_config = {
    headers: {
      ...form.getHeaders()
    }
  };

  return getAxios().post(`/file`, form, request_config);
}

export const createMultipleFiles = async () => {
  const filesData = [
    {filename: 'cat.png', path: '/home/app/download_files/cat.png'},
    {filename: 'dog.png', path: '/home/app/download_files/dog.png'},
    {filename: 'pizza.png', path: '/home/app/download_files/pizza.png'},
    {filename: 'calzone.png', path: '/home/app/download_files/calzone.png'},
  ];

  return Promise.all(filesData.map(data => fileCreate(data)));
}

