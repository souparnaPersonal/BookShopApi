import app from './app';
import config from './app/config';

import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // await mongoose.connect('mongodb://localhost:27017/BookDb');

    app.listen(config.port, () => {
      console.log(` app listing on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
