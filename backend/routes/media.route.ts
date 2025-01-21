import express from 'express';
import { getMedia, updateMedia, createMedia, getMediaById, deleteMedia } from '../controllers/media.controller.ts';
import { register, login } from '../controllers/user.controller.ts';

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
mediaRouter.post('/signup', register);

// Exporta o roteador
export default mediaRouter;
