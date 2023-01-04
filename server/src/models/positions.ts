import mongoose from 'mongoose';

const { Schema } = mongoose;

const positionScheme = new Schema(
  {
    title: { type: String, required: true },
    cost: { type: Number, required: true },
    category: { ref: 'Categories', type: Schema.Types.ObjectId },
    user: { ref: 'users', type: Schema.Types.ObjectId, required: true },
  },
  { versionKey: false },
);

export default mongoose.model('Positions', positionScheme);
