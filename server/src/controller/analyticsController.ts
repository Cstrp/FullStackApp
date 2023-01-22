import { Request, Response } from 'express';
import moment from 'moment';
import Order from '../models/order';

export const overview = async (req: Request, res: Response) => {
  try {
    const allOrders = await Order.find({ user: req.user }).sort({ date: 1 });
    if (!allOrders) return res.status(404).json({ error: 'No orders found' });
    const yesterday = moment().add(-1, 'd').format('DD.MM.YYYY');
    const yesterdayOrders = allOrders.filter((order) => moment(order.date).format('DD.MM.YYYY') === yesterday);
    const ordersPerDay = allOrders.length / Object.keys(getOrdersMap(allOrders)).length;
    const gainPerDay = calculate(allOrders) / Object.keys(getOrdersMap(allOrders)).length;
    const gainPercent = (calculate(yesterdayOrders) / gainPerDay - 1) * 100;
    const compareGain = calculate(yesterdayOrders) - gainPerDay;
    const ordersPercent = (yesterdayOrders.length / ordersPerDay - 1) * 100;
    const compareNumber = yesterdayOrders.length - ordersPerDay;

    const gain = {
      percent: Math.abs(gainPercent),
      compare: Math.abs(compareGain),
      yesterday: calculate(yesterdayOrders),
      isHigher: gainPercent > 0,
    };

    const orders = {
      percent: Math.abs(ordersPercent),
      compare: Math.abs(compareNumber),
      yesterday: yesterdayOrders.length,
      isHigher: ordersPercent > 0,
    };

    res.status(200).json({
      gain,
      orders,
    });
  } catch (err) {
    console.log(err);
  }
};

export const analytics = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user }).sort({ date: 1 });
    if (!orders) return res.status(404).json({ error: 'No orders found' });
    const ordersMap = getOrdersMap(orders);
    const average = calculate(orders) / Object.keys(ordersMap).length;
    const chart = Object.keys(ordersMap).map((label) => {
      return { label, order: ordersMap[label].length, gain: calculate(ordersMap[label]) };
    });
    res.status(200).json({ average, chart });
  } catch (err) {
    console.log(err);
  }
};

function getOrdersMap(orders: any[]) {
  return orders.reduce((daysOrders: any, order) => {
    const date = moment(order.date).format('DD.MM.YYYY');
    if (date === moment().format('DD.MM.YYYY')) return daysOrders;
    if (!daysOrders[date]) daysOrders[date] = [];
    daysOrders[date].push(order);
    return daysOrders;
  }, {});
}

function calculate(orders: any[]) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((ordersTotal: number, item: { cost: number; quantity: number }) => {
      return (ordersTotal += item.cost * item.quantity);
    }, 0);
    return (total += orderPrice);
  }, 0);
}
