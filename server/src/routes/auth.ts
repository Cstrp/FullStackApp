import express from 'express';
import * as authController from '../controller';

const authRouter = express.Router();

authRouter.post('/signin', authController.signIn);
authRouter.post('/signup', authController.signUp);

export default authRouter;
