import mongoose from 'mongoose';

import { getMongoURL } from '../utils/config';

mongoose.connect(getMongoURL(), {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connecting to DB 🤘')
});

export async function dropDatabase() {
  return await db.dropDatabase();
}

export default mongoose;
