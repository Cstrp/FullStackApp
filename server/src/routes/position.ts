import express from 'express';
import * as positionController from '../controller';

const positionRouter = express.Router();

positionRouter.get('/:id', positionController.getByCategoryId);
positionRouter.post('/', positionController.createPosition);
positionRouter.patch('/:id', positionController.updatePosition);
positionRouter.delete('/:id', positionController.removePosition);

export default positionRouter;
