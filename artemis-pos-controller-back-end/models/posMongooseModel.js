import { Schema, model } from 'mongoose';

const checkoutSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastVerification: {
      type: Date,
      required: true,
    },
    lastPurchase: {
      type: Date,
      required: true,
    },
  },
  { _id: true },
);

const posSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  checkouts: [checkoutSchema],
});

export default model('Pos', posSchema);
