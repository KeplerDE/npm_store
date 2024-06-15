// utils/db.js

import mongoose from 'mongoose';

let isConnected = false;

export async function connectDb() {
  if (isConnected) {
    console.log('Already connected to the database.');
    return;
  }

  if (mongoose.connections.length > 0) {
    isConnected = mongoose.connections[0].readyState === 1;
    if (isConnected) {
      console.log('Use previous connection to the database.');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = db.connections[0].readyState === 1;
  console.log('New connection to the database.');
}

export async function disconnectDb() {
  if (isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      isConnected = false;
      console.log('Disconnected from the database.');
    }
  }
}
