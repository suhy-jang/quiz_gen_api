if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './config/config.env' });
}
const app = require('./server');
const connectDB = require('./db');

connectDB();
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
