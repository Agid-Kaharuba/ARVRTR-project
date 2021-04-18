import ApiInitializer from "../initializer";
import { CourseRoute } from "./course-router";
import { RecipeRoute } from "./recipe-router";
import CourseController from "../controllers/course";
import RecipeController from "../controllers/recipe";
import { StepRoute } from "./step-router";
import StepController from "../controllers/step";
import { UserRoute } from "./user-router";
import UserController from "../controllers/user";
import { AuthRoute } from "./auth-router";
import AuthController from "../controllers/auth";
import { ImageRoute } from "./image-router";
import ImageController from "../controllers/image";


export const Routes = (init: ApiInitializer) => {
    CourseRoute(init.getApp(), new CourseController());
    RecipeRoute(init.getApp(), new RecipeController());
    StepRoute(init.getApp(), new StepController());
    UserRoute(init.getApp(), new UserController());
    AuthRoute(init.getApp(), new AuthController());
    ImageRoute(init.getApp(), new ImageController());
}