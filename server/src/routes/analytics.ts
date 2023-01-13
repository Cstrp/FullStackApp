import express from 'express';
import * as analyticsController from '../controller';
import passport from 'passport';

const analyticsRouter = express.Router();

analyticsRouter.get('/overview', passport.authenticate('jwt', { session: false }), analyticsController.overview);
analyticsRouter.get('/analytics', passport.authenticate('jwt', { session: false }), analyticsController.analytics);

export default analyticsRouter;
