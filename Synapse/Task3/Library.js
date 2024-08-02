import express from 'express';
import router from './routes/routes.js';
import connectDB from './db/DatabaseConnection.js';
import 'dotenv/config';

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use('/api', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
