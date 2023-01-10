import position from '../models/category';
import { ObjectId } from 'mongodb';
import { socket } from './server.service';

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

export const updatePosition = async (id: string, params: any, emit = true, notify = true) => {
  const _id = new ObjectId(id);
  const updPosition = await position.findByIdAndUpdate(_id, params, { new: true });
  if (emit) {
    socket.emit('position', {
      action: 'update',
      ids: [updPosition?._id],
      notify,
    });
  }
  return updPosition;
};
