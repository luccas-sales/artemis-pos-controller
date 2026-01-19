import 'dotenv/config';
import mongoose from 'mongoose';

const { MONGO_URL } = process.env;

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Database connection completed!');
  } catch (err) {
    console.log('Database connection not made!');
    console.log(err);
  }
};
