"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_ts_1 = require("./config/db.ts");
const media_route_ts_1 = __importDefault(require("./routes/media.route.ts"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Configuração básica do CORS
app.use((0, cors_1.default)());
// Ou, configuração específica para a origem
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Substitua pela URL do seu frontend
}));
app.use(express_1.default.json()); // allow us to accept json from the body
app.use('/api', media_route_ts_1.default);
app.listen(PORT, () => {
    (0, db_ts_1.connectDB)();
    console.log('Server started at https://localhost:' + PORT);
});
