import mongoose from 'mongoose';

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URL!);

    const connection = mongoose.connection;

    connection.once('connected', () => {
      console.log('MONGODB CONNECTED');
    });

    connection.on('error', (err) => {
      console.log('Failed to connect:', err);
    });
  } catch (error) {
    console.log('MONGODB CONNECTION ERROR: 🔥', error);
  }
}
