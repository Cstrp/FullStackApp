import { Request, Response } from 'express';
import { OrderType } from '../interfaces/order';
import Order from '../models/order';
import moment from 'moment';

export const overview = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user }).sort({ date: 1 });
    const yesterday = moment().add(-1, 'd').format('DD.MM.YYYY');
    const yesterdayOrdersList = getOrderMap(orders)[yesterday];
    const totalOrdersNumber = orders.length;
    const daysNumber = Object.keys(getOrderMap(orders)).length;
    const ordersPerDay = totalOrdersNumber / daysNumber;
    const yesterdayOrdersNum = yesterdayOrdersList.length;
    const totalRevenue = calculate(orders);
    const totalRevenuePerDay = totalRevenue / daysNumber;
    const yesterdayGain = calculate(yesterdayOrdersList);
    const gainData = {
      percent: Math.abs((yesterdayGain / totalRevenuePerDay - 1) * 100).toFixed(2),
      compare: (yesterdayGain - totalRevenuePerDay).toFixed(2),
      yesterday: +yesterdayGain,
      higher: yesterdayGain > totalRevenuePerDay,
    };
    const ordersData = {
      percent: Math.abs((yesterdayOrdersNum / ordersPerDay - 1) * 100).toFixed(2),
      compare: (yesterdayOrdersNum - ordersPerDay).toFixed(2),
      yesterday: +yesterdayOrdersNum,
      higher: yesterdayOrdersNum > ordersPerDay,
    };
    res.status(200).json({ gain: gainData, orders: ordersData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error retrieving data' });
  }
};

export const analytics = async (req: Request, res: Response) => {
  try {
    const ordersList = await Order.find({ user: req.user }).sort({ date: 1 });
    const ordersMap = getOrderMap(ordersList);

    const average = +(calculate(ordersList) / Object.keys(ordersMap).length).toFixed(2);

    const chart = Object.keys(ordersMap).map((label) => {
      const gain = calculate(ordersMap[label]);
      const order = ordersMap[label].length;

      return { label, order, gain };
    });

    res.status(200).json({ average, chart });
  } catch (err) {
    return console.log(err);
  }
};

function getOrderMap(orders: any) {
  const daysOrders: { [key: string]: OrderType[] } = {};
  orders.forEach((order: OrderType) => {
    const day = moment(order.date).format('DD.MM.YYYY');

    if (day === moment().format('DD.MM.YYYY')) return;

    if (!daysOrders[day]) {
      daysOrders[day] = [];
    }

    daysOrders[day].push(order);
  });

  return daysOrders;
}

function calculate(orders: any[]) {
  return orders.reduce((total, order) => {
    const cost = order.list.reduce((orderTotal: number, item: { cost: number; quantity: number }) => {
      return (orderTotal += item.cost * item.quantity);
    }, 0);

    return (total += cost);
  }, 0);
}
