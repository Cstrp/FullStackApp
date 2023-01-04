import express from 'express';
import passport from 'passport';
import * as categoryController from '../controller';

const categoryRouter = express.Router();

categoryRouter.get('/', passport.authenticate('jwt', { session: false }), categoryController.getAllOrder);
categoryRouter.get('/:id', categoryController.getById);
categoryRouter.delete('/:id', categoryController.removePosition);
categoryRouter.post('/', categoryController.createPosition);
categoryRouter.patch('/:id', categoryController.updatePosition);

export default categoryRouter;
