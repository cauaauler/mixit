"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const media_controller_1 = require("../controllers/media.controller");
const user_controller_1 = require("../controllers/user.controller");
// Cria o roteador
const mediaRouter = express_1.default.Router();
// Rotas Media
mediaRouter.post('/media/', media_controller_1.createMedia);
mediaRouter.get('/media/:id', media_controller_1.getMediaById);
mediaRouter.get('/media/', media_controller_1.getMedia);
mediaRouter.put('/media/:id', media_controller_1.updateMedia);
mediaRouter.delete('/media/:id', media_controller_1.deleteMedia);
//Rotas User
mediaRouter.post('/login', user_controller_1.login);
mediaRouter.post('/register', user_controller_1.register);
// Exporta o roteador
exports.default = mediaRouter;
