"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mediaSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
    },
}, {
    timestamps: true, // Cria os campos createdAt e updatedAt
});
const Media = mongoose_1.default.model('Media', mediaSchema);
exports.default = Media;
