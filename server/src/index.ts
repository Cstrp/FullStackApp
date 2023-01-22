import mongoose from 'mongoose';
import { dburl, port } from './config/keys';
import * as serverService from './services/server.service';


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
