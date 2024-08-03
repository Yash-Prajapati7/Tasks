import router from './routes.js';
import express from 'express';
import connectDB from './DatabaseConnection.js';

connectDB();
const app = express();

app.use(express.json());
app.use('/v2', router);

app.listen(3000);