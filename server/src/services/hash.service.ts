import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(12);

export const encrypt = (value: string) => {
  return bcrypt.hashSync(value, salt);
};

export const checkPassword = (value: string, hash: string) => {
  return bcrypt.compareSync(value, hash);
};
