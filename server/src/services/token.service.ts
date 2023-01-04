import jwt from 'jsonwebtoken';
import { dbkey } from '../config/keys';

export const token = (id: string, email: string) => {
  return jwt.sign({ id, email }, dbkey, { expiresIn: '666m' });
};

// export const checkToken = (token: string) => {
//   try {
//     jwt.verify(token, dbkey);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };
