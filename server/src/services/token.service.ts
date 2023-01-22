import jwt from 'jsonwebtoken';
import { dbkey } from '../config/keys';

export const token = (id: string, email: string) => {
  return jwt.sign({ id, email }, dbkey, { expiresIn: '666m' });
};

