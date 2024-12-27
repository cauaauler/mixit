import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import mediaRouter from './routes/media.route.js';

dotenv.config();

const app = express();

app.use(express.json()); // allow us to accept json from the body

app.use('/api/media', mediaRouter);

app.listen(5000, () => {
    connectDB();
    console.log('Server started at https://localhost:5000');
});
