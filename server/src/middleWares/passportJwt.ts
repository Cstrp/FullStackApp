import passportJwt, { VerifiedCallback } from 'passport-jwt';
import mongoose from 'mongoose';
import { dbkey } from '../config/keys';
import { PassportStatic } from 'passport';

const User = mongoose.model('Users');
const JwtStrategy = passportJwt.Strategy;

const options = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: dbkey,
};

export const _passportJwt = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, async (payload: any, done: VerifiedCallback) => {
      try {
        const user = await User.findById(payload.id).select('email id');

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        return console.log(error);
      }
    }),
  );
};
