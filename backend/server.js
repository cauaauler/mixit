import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import mediaRouter from './routes/media.route.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



// Configuração básica do CORS
app.use(cors());

// Ou, configuração específica para a origem
app.use(
    cors({
        origin: "http://localhost:5173", // Substitua pela URL do seu frontend
    })
);

app.use(express.json()); // allow us to accept json from the body

app.use('/api', mediaRouter);

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at https://localhost:' + PORT);
});

