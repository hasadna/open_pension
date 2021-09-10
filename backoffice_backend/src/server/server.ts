import { AuthenticationError } from 'apollo-server';
import {isEmpty} from 'lodash';
import * as fs from "fs";

import { loadUserByToken } from '../db/user';

import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import {ApolloServer} from "apollo-server-express";
import {getTempStorageFiles} from "../utils/config";
const uploadMiddlewareHandler = require('multer');
import {join} from 'path';
import {log} from "open-pension-logger"

export const getUserFromRequest = async (req) => {
  if (isEmpty(req)) {
    return {};
  }

  if (isEmpty(req.headers)) {
    return {};
  }

  if (isEmpty(req.headers.authorization)) {
    return {};
  }

  const token = req.headers.authorization;
  const user = await loadUserByToken(token);

  if (isEmpty(user)) {
    return {};
  }

  return {user};
}

export const assertLoggedIn = ({user}) => {
  // todo: should be a middelware.
  if (isEmpty(user)) {
    log('An un-authorized user try to access the endpoint', 'error')
    throw new AuthenticationError('you must be logged in');
  }
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    // Move to a middleware.
    return getUserFromRequest(req);
  },
});

const storage = uploadMiddlewareHandler.diskStorage({
  destination: function (_: any, __: any, callback: any) {
    callback(null, getTempStorageFiles())
  },
  filename: function (req: any, file: any, callback: any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    let filename = file.originalname;

    if (fs.existsSync(`${getTempStorageFiles()}/${file.originalname}`)) {
      const filenameNoExt = filename.split('.')[0]
      filename = `${filenameNoExt}_${uniqueSuffix}.${filename.split('.')[1]}`
    }

    if (!req.body.uploadedFiles) {
      req.body.uploadedFiles = [];
    }

    req.body.uploadedFiles.push(join(getTempStorageFiles(), filename))
    callback(null, filename)
  }
})

export const uploadMiddleware = uploadMiddlewareHandler({ storage: storage }).array('files')
