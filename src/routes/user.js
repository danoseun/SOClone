import express from 'express';
import { userValidator } from '../validations/user';
import { userController } from '../controllers/user';

const { validateSignup, validateLogin } = userValidator;
const { signupUser, loginUser, searchUsers } = userController;

export const userRouter = express.Router();

userRouter.post('/signup', validateSignup, signupUser);
userRouter.post('/login', validateLogin, loginUser);
userRouter.get('/users', searchUsers)