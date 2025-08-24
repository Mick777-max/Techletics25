import mongoose from 'mongoose';
global.mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    console.log('Using existing connection');
    return global.mongoose.conn;
  } else {
    const conString = process.env.MONGODB_URL;

    const promise = mongoose.connect(conString, {
      autoIndex: true,
    });

    global.mongoose = {
      conn: await promise,
      promise,
    };
    console.log('New connection');
    return await promise;
  }
}

export default dbConnect;
