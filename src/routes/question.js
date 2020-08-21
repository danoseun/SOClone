import express from 'express';
import { questionValidator } from '../validations/question';
import { questionController } from '../controllers/question';
import { verifyToken } from '../middleware';

const { validateQuestion, validateAnswer } = questionValidator;
const { askQuestion, viewQuestions, answerQuestion, upVoteQuestion, downVoteQuestion } = questionController;

export const questionRouter = express.Router();

questionRouter.post('/questions', verifyToken, validateQuestion, askQuestion);
questionRouter.get('/questions', viewQuestions);
questionRouter.post('/questions/:id/answers', verifyToken, validateAnswer, answerQuestion);
questionRouter.post('/questions/:id/upvotes', verifyToken, upVoteQuestion);
questionRouter.post('/questions/:id/downvotes', verifyToken, downVoteQuestion);