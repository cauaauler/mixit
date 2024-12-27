import express from 'express';
import { getMedia, updateMedia, createMedia, getMediaById, deleteMedia } from '../controllers/media.controller.js';

// Cria o roteador
const mediaRouter = express.Router();

// Define as rotas e associa os controladores
mediaRouter.post('/', createMedia);
mediaRouter.get('/:id', getMediaById);
mediaRouter.get('/', getMedia);
mediaRouter.put('/:id', updateMedia);
mediaRouter.delete('/:id', deleteMedia);

// Exporta o roteador
export default mediaRouter;
