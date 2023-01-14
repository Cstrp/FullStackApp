import { Request, Response } from 'express';
import { checkBody } from '../services';
import * as userService from '../services/user.service';
import { checkPassword, encrypt } from '../services/hash.service';
import { token } from '../services/token.service';

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const error = checkBody(req.body, ['email', 'password']);
  const foundedUser = await userService.findOneUser({ email });

  if (error) return res.status(400).json({ error: `Bad request ${error}` });

  try {
    if (foundedUser) {
      const correctPassword = checkPassword(password, foundedUser.password);
      if (correctPassword) return res.status(200).json({ token: `Bearer ${token(foundedUser.id, email)}` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error signing in' });
  }

  return res.status(401).json({ error: 'Authorization error, email or password is incorrect' });
};

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const error = checkBody(req.body, ['email', 'password']);
  const foundedUser = await userService.findOneUser({ email });
  const encryptPass = encrypt(password);

  if (error) return res.status(400).json({ message: `Bad request ${error}` });
  if (foundedUser) return res.status(409).json({ message: 'User already exists' });

  try {
    const user = await userService.createUser({ email, password: encryptPass });
    res.status(201).json({ user, message: 'User has been created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating user' });
  }
};
