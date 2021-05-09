import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    recipe: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    archive: {
        type: Boolean,
        required: false
    }
});

export default mongoose.model('Task', taskSchema);