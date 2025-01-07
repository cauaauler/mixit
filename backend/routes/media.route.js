import express from 'express';
import { getMedia, updateMedia, createMedia, getMediaById, deleteMedia } from '../controllers/media.controller.js';
import { register, login } from '../controllers/user.controller.js';

// Cria o roteador
const mediaRouter = express.Router();

// Rotas Media
mediaRouter.post('/media/', createMedia);
mediaRouter.get('/media/:id', getMediaById);
mediaRouter.get('/media/', getMedia);
mediaRouter.put('/media/:id', updateMedia);
mediaRouter.delete('/media/:id', deleteMedia);

//Rotas User
mediaRouter.post('/login', login);
mediaRouter.post('/register', register);

// Exporta o roteador
export default mediaRouter;
