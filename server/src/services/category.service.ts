import category from '../models/category';

export const findCategory = () => {
  return category.find({});
};
