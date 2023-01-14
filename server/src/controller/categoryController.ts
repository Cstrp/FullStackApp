import { Request, Response } from 'express';
import Category from '../models/category';
import Positions from '../models/positions';
import * as categoryService from '../services/category.service';
import { createError } from '../services';

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.findCategory(req);
    res.status(200).json(categories);
  } catch (error) {
    return res.status(404).send(createError(404, 'Category was not founded!'));
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const foundedCategory = await categoryService.findCategoryById(req.params['id']);
    res.status(200).json(foundedCategory);
  } catch (error) {
    return res.status(404).send(createError(404, 'Category was not founded!'));
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const category = new Category({
    title: req.body.title,
    user: req.user,
    imagesSrc: req.file ? req.file.path : '',
  });

  try {
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    return console.log(error);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const updatedCategory: any = {
    title: req.body.title,
  };

  if (req.file) {
    updatedCategory.imagesSrc = req.file.path;
  }

  try {
    const category = await Category.findOneAndUpdate({ _id: req.params.id }, { $set: updatedCategory }, { new: true });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update category', error });
  }
};

export const removeCategory = async (req: Request, res: Response) => {
  try {
    await Category.remove({ _id: req.params.id });
    await Positions.remove({ category: req.params.id });
    res.status(200).json({ message: 'Category was deleted' });
    res.status(200).json();
  } catch (error) {
    console.log(error);
  }
};
