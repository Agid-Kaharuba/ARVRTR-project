import mongoose from 'mongoose';
import Task from './task';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  tasks: [{
    type: Task.schema,
    required: false,
  }],
  assignedEmployees: [{
    // TODO: When type is User.schema it is causing primary key collision in the seeder
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  }],
  archive: {
    type: Boolean,
    required: false,
  },
});

export default mongoose.model('Course', courseSchema);
