import category from '../models/category';
import { ObjectId } from 'mongodb';

export const findCategory = () => {
  return category.find({});
};

export const findCategoryById = (id: string) => {
  return category.findById(new ObjectId(id));
};
