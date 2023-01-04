import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderScheme = new Schema(
  {
    date: { type: Date, default: Date.now },
    order: { type: Number, required: true },
    list: [
      {
        name: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        cost: {
          type: Number,
        },
      },
    ],
    user: { ref: 'users', type: Schema.Types.ObjectId, required: true },
  },
  { versionKey: false },
);

export default mongoose.model('Orders', orderScheme);
