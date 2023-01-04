import { Response } from 'express';

export const createError = (statusCode: number, message: string) => {
  return { statusCode, message };
};

export const createMessage = (res: Response, message: string) => {
  return { res, message };
};

export const checkBody = (body: object, keys: string[]): string | null => {
  const bodyKeys = Object.keys(body);

  if (bodyKeys.length === 0) {
    return 'Body is required';
  }

  for (const key of keys) {
    if (!body.hasOwnProperty(key)) {
      return `${key} is required`;
    }
  }

  if (bodyKeys.length > keys.length) {
    const props = bodyKeys.filter((prop) => !keys.includes(prop));

    return `properties ${props.join(',')} shouldn't exist`;
  }

  return null;
};
