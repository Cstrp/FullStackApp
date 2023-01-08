import { Request, Response } from 'express';
import Category from '../models/category';
import Positions from '../models/positions';
import { findCategory } from '../services/category.service';

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await findCategory();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findById(req.params.id);
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
  }
};

export const removeCategory = async (req: Request, res: Response) => {
  try {
    await Category.remove({ _id: req.params.id });
    await Positions.remove({ category: req.params.id });
    res.status(200).json({ message: 'Category remove' });
    res.status(200).json();
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  console.log(req.user);
  const category = new Category({
    title: req.body.title,
    user: req.user,
    imagesSrc: req.file ? req.file.path : '',
  });

  try {
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const upd: any = {
    title: req.body.title,
  };

  if (req.file) {
    upd.imagesSrc = req.file.path;
  }

  try {
    const category = await Category.findOneAndUpdate({ _id: req.params.id }, { $set: upd }, { new: true });
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
  }
};
