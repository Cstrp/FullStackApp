import mongoose from 'mongoose';

const { Schema } = mongoose;

const categoryScheme = new Schema(
  {
    title: { type: String, required: true },
    imagesSrc: { type: String, required: true },
    user: { ref: 'users', type: Schema.Types.ObjectId, required: true },
  },
  { versionKey: false },
);

export default mongoose.model('Category', categoryScheme);
