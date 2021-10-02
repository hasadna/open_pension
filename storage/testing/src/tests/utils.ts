import axios from 'axios';
import {prisma} from "../server/context";
import {FileCreateType, FileResponse, FilesResponse} from "./constAndInterfaces";

export function getAxios() {
  return axios.create({
    baseURL: 'http://localhost:7000',
  });
}

export const fileCreate = async (data: FileCreateType) => await prisma.file.create({data,});

export const createMultipleFiles = async () => {
  const filesData = [
    {filename: 'cat.png', path: '/home/app/download_files/cat.png'},
    {filename: 'dog.png', path: '/home/app/download_files/dog.png'},
    {filename: 'pizza.png', path: '/home/app/download_files/pizza.png'},
    {filename: 'calzone.png', path: '/home/app/download_files/calzone.png'},
  ];

  return Promise.all(filesData.map(data => fileCreate(data)));
}

export const sendGraphQLQuery = async (query: string): Promise<FileResponse|FilesResponse> => getAxios().post(`/graphql`, {query});

