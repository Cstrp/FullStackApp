import category from '../models/category';
import Category from '../models/category';
import { ObjectId } from 'mongodb';
import { socket } from './server.service';

export const createCategory = async (params: any, emit = true, notify = true) => {
  const newCategory = new Category(params);
  await newCategory.save();
  if (emit) {
    socket.emit('categories', {
      action: 'add',
      users: [params.owner, ...params.users],
      ids: [newCategory._id],
      notify,
    });
  }

  return newCategory;
};

export const findCategory = () => {
  return category.find({});
};

export const findCategoryById = (id: string) => {
  return category.findById(new ObjectId(id));
};
