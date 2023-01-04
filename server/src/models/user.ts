import mongoose from 'mongoose';

const { Schema } = mongoose;

const userScheme = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false },
);

export default mongoose.model('Users', userScheme);
