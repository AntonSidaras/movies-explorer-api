/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import { logger } from '../middlewares/logger.js';

const connectToMongoDB = async (user, password) => {
  const atlasURI = `mongodb+srv://${user}:${password}@asidarascluster.k86db.mongodb.net/moviesdb?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(atlasURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    logger.error(`message - ${error.message}, stack trace - ${error.stack}`);
    process.exit(1);
  }
};

export default connectToMongoDB;
