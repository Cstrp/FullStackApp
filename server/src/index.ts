import * as serverService from './services/server.service';
import mongoose from 'mongoose';
import { dburl } from './config/keys';

const port = process.env.PORT || 4201;

(async () => {
  try {
    mongoose.set({ strictQuery: true });
    await mongoose.connect(dburl);
    serverService.app.listen(port, () => console.log(`Server has been started on http://localhost:${port}/`));
  } catch (error) {
    console.log(error);
  }
})();

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  process.exit();
});
