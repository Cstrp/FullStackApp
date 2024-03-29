import { Request, Response } from 'express';
import Order from '../models/order';

export const getAllOrder = async (req: Request, res: Response) => {
  const query: any = {
    user: req.user,
  };

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
    query.order = +req.query.order;
  }

  try {
    const orders = await Order.find(query).sort({ date: -1 }).skip(+req.query.offset!).limit(+req.query.limit!);

    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { list } = req.body;

    const lastOrder = await Order.findOne({
      user: req.user,
    }).sort({ date: -1 });

    const maxOrder = lastOrder ? lastOrder.order : 0;

    const newOrder = await new Order({
      list,
      user: req.user,
      order: maxOrder + 1,
      date: new Date(),
    }).save();

    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order' });
  }
};
