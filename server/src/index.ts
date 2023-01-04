import * as serverService from './services/server.service';
import mongoose from 'mongoose';
import { dburl } from './config/keys';

const port = process.env.PORT || 5000;

(async () => {
  try {
    mongoose.set({ strictQuery: true });
    await mongoose.connect(dburl);
    serverService.app.listen(port, () => console.log(`Server has been started on ${port}`));
  } catch (error) {
    console.log(error);
  }
})();
