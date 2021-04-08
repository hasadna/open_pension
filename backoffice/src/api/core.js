import axios from 'axios';
import {isEmpty} from 'lodash';

export const API_URL = process.env.REACT_APP_API;
export const STORAGE_URL = process.env.REACT_APP_STORAGE_API;

let axiosInstance = null;

export function getAxios() {
  if (axiosInstance) {
    return axiosInstance;
  }

  axiosInstance = axios.create({
    baseURL: API_URL,
  });

  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.authorization = token;
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Maintain here access token and refresh token.
  return axiosInstance;
}

export async function sendQuery(query) {
  const axios = getAxios();

  const {data: response} = await axios.post('', {
    query
  });

  const {data, errors} = response;

  let error = {};
  if (errors) {
    const [errorFromServer] = errors;
    error['message'] = errorFromServer.message;

    // todo: handle better.
    if (!isEmpty(errorFromServer.extensions.exception)) {
      delete errorFromServer.extensions.exception['stacktrace'];
      error['fields'] = errorFromServer.extensions.exception;
    }
  }
  return {data, error};
}

