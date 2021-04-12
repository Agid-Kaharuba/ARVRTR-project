import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    archive: {
        type: Boolean,
        required: false
    }
});

export default mongoose.model('Ingredient', ingredientSchema);