import express from 'express';
import * as orderController from '../controller';

const orderRouter = express.Router();

orderRouter.get('/', orderController.getAllOrder);
orderRouter.post('/', orderController.createPosition);

export default orderRouter;
