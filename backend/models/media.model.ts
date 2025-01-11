import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
	{
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
	},
	{
		timestamps: true, // Cria os campos createdAt e updatedAt
	}
);


const Media = mongoose.model('Media', mediaSchema);

export default Media;