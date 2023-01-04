import { Request, Response } from 'express';
import { checkBody, createError } from '../services';
import * as userService from '../services/user.service';
import { checkPassword, encrypt } from '../services/hash.service';
import { token } from '../services/token.service';

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const error = checkBody(req.body, ['email', 'password']);
  const foundedUser = await userService.findOneUser({ email });

  if (error) return res.status(400).send(createError(400, `Bad request ${error}`));

  try {
    if (foundedUser) {
      const [correctPassword] = await Promise.all([checkPassword(password, foundedUser.password)]);
      if (correctPassword) return res.send({ token: `Bearer ${token(foundedUser.id, email)}` });
    }
  } catch (error) {
    return console.log(error);
  }

  return res.status(404).send(createError(404, `Authorization error, user is not found`));
};

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const error = checkBody(req.body, ['email', 'password']);
  const foundedUser = await userService.findOneUser({ email });
  const encryptPass = encrypt(password);

  if (error) return res.status(400).send(createError(400, `Bad request ${error}`));
  if (foundedUser) return res.status(409).send(createError(409, 'User already exist'));

  try {
    const user = await userService.createUser({ email, password: encryptPass });
    res.json({ user, message: 'User has been create' });
  } catch (error) {
    return console.log(error);
  }
};
