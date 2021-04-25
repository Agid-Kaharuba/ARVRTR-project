import mongoose from "mongoose"

const ProfileImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  mimetype:{
    type: String,
    required: true
  },
  img: {
    type: Buffer,
    required: true
  }
},
{collection: 'ProfilePics'})
export default mongoose.model('ProfileImage', ProfileImageSchema);