import { Request, Response } from 'express';

export const getAllOrder = (req: Request, res: Response) => {
  res.status(200).send('Hello world');
};
export const createOrder = (req: Request, res: Response) => {
  res.status(200).send('Hello');
};
