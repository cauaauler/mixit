import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import mediaRouter from './routes/media.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow us to accept json from the body

app.use('/api/media', mediaRouter);

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at https://localhost:' + PORT);
});
