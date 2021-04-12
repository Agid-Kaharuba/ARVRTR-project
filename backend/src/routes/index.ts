import ApiInitializer from "../initializer";
import { CourseRoute } from "./course-router";
import { RecipeRoute } from "./recipe-router";
import CourseController from "../controllers/course";
import RecipeController from "../controllers/recipe";
import { StepRoute } from "./step-router";
import StepController from "../controllers/step";
import { UserRoute } from "./user-router";
import UserController from "../controllers/user";
import { IngredientRoute } from "./ingredient-router";
import IngredientController from "../controllers/ingredient";

export const Routes = (init: ApiInitializer) => {
    CourseRoute(init.getApp(), new CourseController());
    RecipeRoute(init.getApp(), new RecipeController());
    StepRoute(init.getApp(), new StepController());
    UserRoute(init.getApp(), new UserController());
    IngredientRoute(init.getApp(), new IngredientController());
}