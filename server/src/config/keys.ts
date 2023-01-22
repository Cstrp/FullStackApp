import dotenv from 'dotenv';
dotenv.config()

export const port = process.env.PORT || '4202'
export const dbkey = process.env.KEY || '';
export const dburl = process.env.URL || '';
