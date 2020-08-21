import express from 'express';
import { successResponse, errorResponse, successResponseWithData } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';

export const defaultRouter = express.Router();

defaultRouter.get('/api', (req, res) => {
    successResponse(res, statusCodes.success, messages.welcome);
});

defaultRouter.all('*', (req, res) => {
    errorResponse(res, statusCodes.notFound, messages.notFound);
});