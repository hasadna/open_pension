import {getMongoDb} from "../services/env";

const mongoose = require('mongoose');

mongoose.connect(getMongoDb(), {useNewUrlParser: true, useUnifiedTopology: true});

export default mongoose;
