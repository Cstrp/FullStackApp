import express from 'express';
import * as authController from '../controller';

const authRouter = express.Router();

authRouter.post('/login', authController.signIn);
authRouter.post('/register', authController.signUp);

export default authRouter;
