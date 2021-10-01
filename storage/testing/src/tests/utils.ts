import axios from 'axios';

export function getAxios() {
  return axios.create({
    baseURL: 'http://localhost:7000',
  });
}
