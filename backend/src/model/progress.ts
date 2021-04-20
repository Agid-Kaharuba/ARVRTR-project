import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true
  }
});

export default mongoose.model('CourseProgress', progressSchema);