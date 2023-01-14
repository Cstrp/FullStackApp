import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import passport from 'passport';
import authRouter from '../routes/auth';
import analyticsRouter from '../routes/analytics';
import categoryRouter from '../routes/category';
import orderRoute from '../routes/order';
import positionRoute from '../routes/position';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { _passportJwt } from '../middleWares/passportJwt';

export const app = express();
export const server = http.createServer(app);
export const socket = new Server(server, {
  cors: { origin: '*' },
});

app.use(passport.initialize());
_passportJwt(passport);

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use('/auth', authRouter);
app.use('/analytics', analyticsRouter);
app.use('/category', categoryRouter);
app.use('/order', orderRoute);
app.use('/position', positionRoute);
