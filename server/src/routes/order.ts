import express from 'express';
import * as orderController from '../controller';
import passport from 'passport';

const orderRouter = express.Router();

orderRouter.get('/', passport.authenticate('jwt', { session: false }), orderController.getAllOrder);
orderRouter.post('/', passport.authenticate('jwt', { session: false }), orderController.createOrder);

export default orderRouter;
