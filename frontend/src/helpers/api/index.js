import {
  verify,
  registerUser,
  loginUser
} from "./auth";
import {
  getAllUser,
  getCurrentUser,
  getUser,
  updateUser
} from "./user";
import {
  getAllCourses,
  createCourse
} from "./course";

export const API_HOST = "http://localhost:4000";

export default {
  auth: {
    verify: verify,
    login: loginUser,
    register: registerUser
  },
  user: {
    current: getCurrentUser,
    all: getAllUser,
    get: getUser,
    update: updateUser
  },
  course: {
    getAll: getAllCourses,
    create: createCourse
  }
}
