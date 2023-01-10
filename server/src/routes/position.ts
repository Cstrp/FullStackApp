import express from 'express';
import * as positionController from '../controller';
import passport from 'passport';

const positionRouter = express.Router();

positionRouter.get('/:id', passport.authenticate('jwt', { session: false }), positionController.getPositionById);
positionRouter.post('/', passport.authenticate('jwt', { session: false }), positionController.createPosition);
positionRouter.patch('/:id', passport.authenticate('jwt', { session: false }), positionController.updatePosition);
positionRouter.delete('/:id', passport.authenticate('jwt', { session: false }), positionController.deletePosition);

export default positionRouter;
