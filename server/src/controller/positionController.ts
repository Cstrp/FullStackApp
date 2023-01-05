import { Request, Response } from 'express';
import * as positionService from '../services/position.service';
import Positions from '../models/positions';

export const getPositionById = async (req: Request, res: Response) => {
  try {
    const foundedPosition = await positionService.findPositionById(req.user, req.params['categoriesId']);
    res.json(foundedPosition);
  } catch (error) {
    console.log(error);
  }
};

export const createPosition = (req: Request, res: Response) => {
  try {
    const { name, cost, category } = req.body;
    const position = positionService.createPosition({
      name,
      cost,
      category,
      user: req.user,
    });
    res.status(201).json({ position, message: 'Position has been create' });
  } catch (error) {
    console.log(error);
  }
};

export const removePosition = async (req: Request, res: Response) => {
  try {
    await Positions.remove({ _id: req.params.id });
    res.status(200).json({
      message: 'Position remove',
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePosition = async (req: Request, res: Response) => {
  try {
    const guid = req.header('Guid') || 'undefined';
    const position = positionService.updatePosition(req.params.id, { $set: req.body }, guid);
    res.status(200).json(position);
  } catch (error) {
    console.log(error);
  }
};
