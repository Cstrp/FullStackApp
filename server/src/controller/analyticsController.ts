import { Request, Response } from 'express';
import Order from '../models/order';
import moment from 'moment';

export const overview = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user }).sort({ date: 1 });
    const ordersMap = getOrderMap(orders);
    const yesterdayOrdersList = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')];
    const yesterdayOrdersNum: number = yesterdayOrdersList.length;
    const totalOrdersNumber: number = orders.length;
    const daysNumber: number = Object.keys(ordersMap).length;
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(2);
    const ordersPercent = ((yesterdayOrdersNum / +ordersPerDay - 1) * 100).toFixed(2);
    const totalRevenue = calculate(orders);
    const totalRevenuePerDay = totalRevenue / daysNumber;
    const yesterdayGain = calculate(yesterdayOrdersList);
    const gainPercent = ((yesterdayGain / totalRevenuePerDay - 1) * 100).toFixed(2);
    const compareGain = (yesterdayGain - totalRevenuePerDay).toFixed(2);
    const compareNumber = (yesterdayOrdersNum - +ordersPerDay).toFixed(2);

    res.status(200).json({
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+compareGain),
        yesterday: +yesterdayGain,
        higher: +gainPercent > 0,
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareNumber),
        yesterday: +yesterdayOrdersNum,
        higher: +ordersPercent > 0,
      },
    });
  } catch (err) {
    return console.log(err);
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
  const daysOrders: any = {};
  orders.forEach((order: any) => {
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
