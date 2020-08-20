import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { messages } from '../utils/message';

dotenv.config();

export const connect = async () => {
  try {
    const db = await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log(messages.connectedToDatabase);
    return db;
  } catch (error) {
    console.log(error);
    return console.log(messages.failedToConnect);
  }
};

