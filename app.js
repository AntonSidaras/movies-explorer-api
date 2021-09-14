import env from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import auth from './middlewares/auth.js';
import corsPolicy from './middlewares/cors-policy.js';
import helmetPolicy from './middlewares/helmet-policy.js';
import connectToMongoDB from './utils/db.js';
import errorHandler from './middlewares/error-handler.js';
import limiter from './middlewares/limiter.js';
import { common, appConstants } from './utils/constants.js';
import authRouter from './routes/auth.js';

env.config();

const {
  PORT = 3000,
  NODE_ENV = common.developmentMode,
  MONGO_URI,
} = process.env;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongoDB(NODE_ENV === common.productionMode ? MONGO_URI : appConstants.localhostDB);

app.use(requestLogger);

app.use(limiter);
app.use(helmetPolicy);
app.use(corsPolicy);

app.use(authRouter);

app.use(auth); // нужна правка под куки

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {});
