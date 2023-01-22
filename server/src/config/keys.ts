import dotenv from 'dotenv';
dotenv.config()

export const dbkey = process.env.KEY || ''
export const dburl = process.env.URL || ''
export const port = process.env.PORT || 3001;
