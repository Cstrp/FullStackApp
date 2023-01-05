import express from 'express';
import passport from 'passport';
import * as categoryController from '../controller';
import { _multer } from '../middleWares/upload';

const categoryRouter = express.Router();

categoryRouter.get('/', passport.authenticate('jwt', { session: false }), categoryController.getAllCategory);
categoryRouter.get('/:id', passport.authenticate('jwt', { session: false }), categoryController.getCategoryById);
categoryRouter.delete('/:id', passport.authenticate('jwt', { session: false }), categoryController.removeCategory);
categoryRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  _multer.single('image'),
  categoryController.createCategory,
);
categoryRouter.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  _multer.single('image'),
  categoryController.updateCategory,
);

export default categoryRouter;
