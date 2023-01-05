import { Request, Response } from 'express';
import Order from '../models/order';

export const getAllOrder = async (req: Request, res: Response) => {
  const query: any = {
    user: req.user,
  };

  // Start Date
  if (req.query.start) {
    query.date = {
      $gte: req.query.start,
    };
  }

  if (req.query.end) {
    if (!query.date) {
      query.date = {};
    }
    query.date['$lte'] = req.query.end;
  }

  if (req.query.order) {
    query.order = Number(req.query.order);
  }

  try {
    const { offset, limit } = req.query;

    const orders = await Order.find(query).sort({ date: -1 }).skip(Number(offset)).limit(Number(limit));

    res.status(200).json(orders);
  } catch (error) {
    console.log(`${res} ${error}`);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { list } = req.body;

    const lastOrder = await Order.findOne({
      user: req.user,
    }).sort({ date: -1 });

    const maxOrder = lastOrder ? lastOrder.order : 0;

    const order = await new Order({
      list,
      user: req.user,
      order: maxOrder + 1,
    }).save();

    res.status(201).json(order);
  } catch (error) {
    console.log(`${res} ${error}`);
  }
};
