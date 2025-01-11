import { Request, Response } from "express";
import Media from "../models/media.model.ts";
import { IMedia } from "../interfaces/IMedia.ts";
import mongoose from "mongoose";

export const createMedia = async (req: Request, res: Response): Promise<any> => {
	const media: IMedia = req.body as IMedia;

	if (!media.name) {
		return res.status(400).json({ success: false, message: "Name is required" });
	}

	const newMedia = new Media(media);

	try {
		await newMedia.save();
		return res.status(201).json({ success: true, message: "Media created", data: newMedia });
	} catch (error: any) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

export const updateMedia = async (req: Request, res: Response): Promise<any> => {
	const { id } = req.params;
	const media: Partial<IMedia> = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: "Invalid ID" });
	}

	try {
		const updatedMedia = await Media.findByIdAndUpdate(id, media, { new: true });
		if (!updatedMedia) {
			return res.status(404).json({ success: false, message: "Media not found" });
		}
		return res.status(200).json({ success: true, data: updatedMedia });
	} catch (error: any) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

export const getMedia = async (_req: Request, res: Response): Promise<any> => {
	try {
		const media = await Media.find();
		return res.status(200).json({ success: true, data: media });
	} catch (error: any) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

export const getMediaById = async (req: Request, res: Response): Promise<any> => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: "Invalid ID" });
	}

	try {
		const media = await Media.findById(id);
		if (!media) {
			return res.status(404).json({ success: false, message: "Media not found" });
		}
		return res.status(200).json({ success: true, data: media });
	} catch (error: any) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

export const deleteMedia = async (req: Request, res: Response): Promise<any> => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: "Invalid ID" });
	}

	try {
		const deletedMedia = await Media.findByIdAndDelete(id);
		if (!deletedMedia) {
			return res.status(404).json({ success: false, message: "Media not found" });
		}
		return res.status(200).json({ success: true, message: "Media deleted successfully" });
	} catch (error: any) {
		return res.status(500).json({ success: false, message: error.message });
	}
};
