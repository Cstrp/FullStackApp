import { Request, Response } from 'express';
import Positions from '../models/positions';

export const getPositionById = async (req: Request, res: Response) => {
  try {
    const foundedPosition = await Positions.find({
      category: req.params['id'],
      user: req.user,
    });
    res.status(200).json(foundedPosition);
  } catch (error) {
    return console.log(error);
  }
};

export const createPosition = async (req: Request, res: Response) => {
  try {
    const position = await new Positions({
      title: req.body.title,
      cost: req.body.cost,
      category: req.body.category,
      user: req.user,
    }).save();
    res.status(201).json(position);
  } catch (error) {
    return console.log(error);
  }
};

export const updatePosition = async (req: Request, res: Response) => {
  try {
    const position = await Positions.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    if (!position) {
      return res.status(404).json({ message: 'Position not found' });
    }
    res.status(200).json(position);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update position', error });
  }
};

export const deletePosition = async (req: Request, res: Response) => {
  try {
    await Positions.remove({ _id: req.params.id });
    res.status(200).json({
      message: 'Position has been deleted',
    });
  } catch (error) {
    console.log(error);
  }
};
