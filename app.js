import env from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
// eslint-disable-next-line import/extensions
import { requestLogger, errorLogger } from './middlewares/logger.js';

env.config();

const { PORT = 3000, ATLAS_USER, ATLAS_SECRET } = process.env;
const atlasURI = `mongodb+srv://${ATLAS_USER}:${ATLAS_SECRET}@asidarascluster.k86db.mongodb.net/moviesdb?retryWrites=true&w=majority`;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(atlasURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    if (mongoose.connection.readyState === 1) {
      console.log('Успешно подключено к @asidarascluster');
    }
  })
  .catch((err) => {
    setTimeout(() => {
      throw new Error(err.message);
    }, 0);
  });

app.use(requestLogger);
app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {});
