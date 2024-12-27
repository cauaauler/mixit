import Media from "../models/media.model.js";
import mongoose from "mongoose";

export const createMedia = async (req, res) => {
    const media = req.body;

    if (!media.name) {
        return res.status(400).json({ sucess: false, message: 'Name is required' });
    }

    const newMedia = await Media(media);

    try {
        // Adiciona ao banco de dados
        await newMedia.save();
        return res.status(201).json({ sucess: true, message: 'Media created' });
    } catch (error) {
        return res.status(500).json({ sucess: false, message: error.message });
    }
};

export const updateMedia = async (req, res) => {
    const { id } = req.params;
    const media = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Media not found' });
    }
    try {
        const updatedMedia = await Media.findByIdAndUpdate(id, media, { new: true });
        if (!updatedMedia) {
            return res.status(404).json({ success: false, message: 'Media not found' });
        }
        return res.status(200).json({ success: true, data: updatedMedia });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const getMedia = async (req, res) => {
    try {
        const media = await Media.find();
        return res.status(200).json({ sucess: true, data: media });
    } catch (error) {
        return res.status(500).json({ sucess: false, message: error.message });
    }
}

export const getMediaById = async (req, res) => {
    const { id } = req.params;
    try {
        const media = await Media.findById(id);
        if (!media) {
            return res.status(404).json({ success: false, message: 'Media not found' });
        }
        return res.status(200).json({ success: true, data: media });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteMedia = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMedia = await Media.findByIdAndDelete(id);
        if (!deletedMedia) {
            return res.status(404).json({ success: false, message: 'Media not found' });
        }
        res.status(200).json({ success: true, message: 'Media deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
