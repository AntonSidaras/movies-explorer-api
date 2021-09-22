import mongoose from 'mongoose';
import { logger, serviceLogger } from './logger.js';

const connectToMongoDB = async (URI) => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    serviceLogger.info(`connected to ${URI}`);
  } catch (error) {
    logger.error(`message - ${error.message}, stack trace - ${error.stack}`);
    process.exit(1);
  }
};

export default connectToMongoDB;
