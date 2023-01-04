import { Request, Response } from 'express';
import { checkBody, createError } from '../services/error.service';

export const getAll = async (req: Request, res: Response) => {
  const bodyError = checkBody(req.body, []);
  if (bodyError) {
    return res.status(400).send(createError(400, `Bad request${bodyError}`));
  }
};

export const getById = async (req: Request, res: Response) => {
  const bodyError = checkBody(req.body, []);
  if (bodyError) {
    return res.status(400).send(createError(400, `Bad request${bodyError}`));
  }
};

export const remove = async (req: Request, res: Response) => {
  const bodyError = checkBody(req.body, []);
  if (bodyError) {
    return res.status(400).send(createError(400, `Bad request${bodyError}`));
  }
};

export const create = async (req: Request, res: Response) => {
  const bodyError = checkBody(req.body, []);
  if (bodyError) {
    return res.status(400).send(createError(400, `Bad request${bodyError}`));
  }
};

export const update = async (req: Request, res: Response) => {
  const bodyError = checkBody(req.body, []);
  if (bodyError) {
    return res.status(400).send(createError(400, `Bad request${bodyError}`));
  }
};
