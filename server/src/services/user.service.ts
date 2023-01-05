import User from '../models/user';
import user from '../models/user';
import { socket } from './server.service';

export const createUser = async (params: any, emit = true) => {
  const user = new User(params);
  await user.save();

  if (emit) {
    socket.emit('users', {
      action: 'add',
      ids: [user.id],
    });
  }

  return user;
};

export const findOneUser = (params: any) => {
  return user.findOne(params);
};
