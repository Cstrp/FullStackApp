import category from '../models/category';
import { ObjectId } from 'mongodb';
import { Request } from 'express';

export const findCategory = (req: Request) => {
  return category.find({ user: req.user });
};

export const findCategoryById = (id: string) => {
  return category.findById(new ObjectId(id));
};
