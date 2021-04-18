import {
  verify,
  registerUser,
  loginUser
} from "./auth";

export const API_HOST = "http://localhost:4000";

export default {
    auth: {
      verify: verify,
      login: loginUser,
      register: registerUser
    }
}
