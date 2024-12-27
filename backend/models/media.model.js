import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    }
}, {
    timestamps: true, // Cria os campos createdAt e updatedAt
});

const Media = mongoose.model('Media', mediaSchema);

export default Media;