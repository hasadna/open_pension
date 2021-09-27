import mongoose from 'mongoose';

import { getMongoURL } from '../utils/config';
import {log} from "open-pension-logger";

mongoose.connect(getMongoURL(), {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  log({text: 'There was an error while trying to connect to mongo', error}, 'error')
});
db.once('open', function() {});

export async function dropDatabase() {
  return await db.dropDatabase();
}

export default mongoose;
