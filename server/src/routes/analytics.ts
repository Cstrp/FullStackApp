import express from 'express';
import * as analyticsController from '../controller';

const analyticsRouter = express.Router();

analyticsRouter.get('/overview', analyticsController.overview);
analyticsRouter.get('/api/analytics', analyticsController.analytics);

export default analyticsRouter;
