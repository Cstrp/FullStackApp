import multer from 'multer';
import moment from 'moment';
import e from 'express';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req: e.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');
    callback(null, `${date}-${file.originalname}`);
  },
});
const fileFilter = (req: e.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  const fileTypes = /\.(png|jpe?g|gif|svg|webp|ico|avif)$/i;

  if (fileTypes) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

export const _multer = multer({
  storage,
  fileFilter,
  limits,
});
