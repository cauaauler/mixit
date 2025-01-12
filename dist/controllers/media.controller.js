"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedia = exports.getMediaById = exports.getMedia = exports.updateMedia = exports.createMedia = void 0;
const media_model_ts_1 = __importDefault(require("../models/media.model.ts"));
const mongoose_1 = __importDefault(require("mongoose"));
const createMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const media = req.body;
    if (!media.name) {
        return res.status(400).json({ success: false, message: "Name is required" });
    }
    const newMedia = new media_model_ts_1.default(media);
    try {
        yield newMedia.save();
        return res.status(201).json({ success: true, message: "Media created", data: newMedia });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.createMedia = createMedia;
const updateMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const media = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    try {
        const updatedMedia = yield media_model_ts_1.default.findByIdAndUpdate(id, media, { new: true });
        if (!updatedMedia) {
            return res.status(404).json({ success: false, message: "Media not found" });
        }
        return res.status(200).json({ success: true, data: updatedMedia });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.updateMedia = updateMedia;
const getMedia = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield media_model_ts_1.default.find();
        return res.status(200).json({ success: true, data: media });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.getMedia = getMedia;
const getMediaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    try {
        const media = yield media_model_ts_1.default.findById(id);
        if (!media) {
            return res.status(404).json({ success: false, message: "Media not found" });
        }
        return res.status(200).json({ success: true, data: media });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.getMediaById = getMediaById;
const deleteMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    try {
        const deletedMedia = yield media_model_ts_1.default.findByIdAndDelete(id);
        if (!deletedMedia) {
            return res.status(404).json({ success: false, message: "Media not found" });
        }
        return res.status(200).json({ success: true, message: "Media deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.deleteMedia = deleteMedia;
