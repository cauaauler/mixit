import express from 'express';
import { getMedia, updateMedia, createMedia, getMediaById, deleteMedia } from '../controllers/media.controller.ts';
import { register, login } from '../controllers/user.controller.ts';
import { authenticate } from "../middlewares/authenticate.ts";


// Cria o roteador
const mediaRouter = express.Router();

// Rotas Media
mediaRouter.post("/media", authenticate, createMedia); // Criação de mídia
mediaRouter.put("/media/:id", authenticate, updateMedia); // Atualização de mídia
mediaRouter.get("/media", authenticate, getMedia); // Listar todas as mídias
mediaRouter.get("/media/:id", authenticate, getMediaById); // Buscar mídia por ID
mediaRouter.delete("/media/:id", authenticate, deleteMedia); // Deletar mídia

//Rotas User
mediaRouter.post('/login', login);
mediaRouter.post('/signup', register);

// Exporta o roteador
export default mediaRouter;
