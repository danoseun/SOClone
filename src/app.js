import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import redis from 'redis';
import { connect } from '../src/config'
import { messages } from '../src/utils/message';
import {
    userRouter
  } from './routes';


 

dotenv.config();

const app = express();
connect();

app.use(logger('dev'));

export const redisClient = redis.createClient(process.env.REDIS_URL);

//Connection
redisClient.on('connect', () => {
   console.log(messages.redisConnected);
});

//Error
redisClient.on('error', (err) => {
   console.log(`${messages.redisConnectionError} ${err}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 1320;



app.use('/api', userRouter);



// entry point of the application
app.get('*', (req, res) => res.status(200).send({
   message: messages.welcome
}));
app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});
export default app;