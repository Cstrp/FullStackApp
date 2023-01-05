import position from '../models/category';
import Category from '../models/category';
import { ObjectId } from 'mongodb';
import { socket } from './server.service';

export const findPositionById = (req: any, id: string) => {
  return position.find({
    category: new ObjectId(id),
    user: req.user.id,
  });
};

export const createPosition = async (params: any, emit = true, notify = true) => {
  const category = new Category(params);
  await category.save();

  if (emit) {
    socket.emit('position', {
      action: 'add',
      users: [params.owner, ...params.users],
      ids: [category.id],
      name: params.name,
      cost: params.cost,
      user: params.user.id,
      notify,
    });
  }
};

export const removePosition = async (ids: string, emit = true, notify = true) => {
  const id = new ObjectId(ids);
  const rmPosition = await position.findByIdAndDelete(id);

  if (emit) {
    socket.emit('position', {
      action: 'delete',
      idx: [rmPosition?._id],
      notify,
    });
  }
};

export const updatePosition = async (id: string, params: any, guid: string, emit = true, notify = true) => {
  const _id = new ObjectId(id);
  const updPosition = await position.findByIdAndUpdate(_id, params, { new: true });
  if (emit) {
    socket.emit('columns', {
      action: 'update',
      ids: [updPosition?._id],
      guid,
      notify,
    });
  }
  return updPosition;
};
