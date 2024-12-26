import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Media from './models/media.model.js';

dotenv.config();

const app = express();

app.use(express.json()); // allow us to accept json from the body

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.post('/api/media', async (req, res) => {
    const media = req.body;

    if(!media.name){
        return res.status(400).json({sucess: false, message: 'Name is required'});
    }

    const newMedia = await Media(media);

    try {
        // Coloca no banco de dados
        await newMedia.save();
        return res.status(201).json({sucess: true, message: 'Media created'});
    } catch (error) {
        return res.status(500).json({sucess: false, message: error.message});
    }
})

app.listen(5000, () => {
    connectDB();
    console.log('Server started at https://localhost:5000');
    });
