import 'dotenv/config';
import express from 'express';
import connectDB from './DatabaseConnection.js';
import router from './routes.js';

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

app.use('/v1', router);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
