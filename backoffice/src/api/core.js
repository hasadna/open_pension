import axios from 'axios';
import {isEmpty} from 'lodash';

export const API_URL = process.env.REACT_APP_API;
export const PUSHER_APP_ID = process.env.REACT_APP_PUSHER_API;
export const PUSHER_APP_CLUSTER = process.env.REACT_APP_PUSHER_CLUSTER;
export const PUSHER_APP_DEBUG = process.env.REACT_APP_PUSHER_DEBUG;

let axiosInstance = null;

export function getAxios(baseAddress='graphql', cachedClient = true) {
  if (axiosInstance && cachedClient) {
    return axiosInstance;
  }

  axiosInstance = axios.create({
    baseURL: `${API_URL}/${baseAddress}`,
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

  const {data: response} = await axios.post('/graphql', {
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
      if (Object.keys(error['fields']).includes('errors')) {
        error['fields'] = error['fields']['errors'];
      }
    }
  }
  return {data, error};
}


