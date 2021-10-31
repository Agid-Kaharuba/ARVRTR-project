import ApiInitializer from '../initializer';
import { CourseRoute } from './course-router';
import { RecipeRoute } from './recipe-router';
import CourseController from '../controllers/course';
import RecipeController from '../controllers/recipe';
import { TaskRoute } from './task-router';
import TaskController from '../controllers/task';
import { UserRoute } from './user-router';
import UserController from '../controllers/user';
import { AuthRoute } from './auth-router';
import AuthController from '../controllers/auth';
import { ImageRoute } from './image-router';
import ImageController from '../controllers/image';
import { ProgressRoute } from './progress-router';
import ProgressController from '../controllers/progress';
import { IngredientRoute } from './ingredient-router';
import IngredientController from '../controllers/ingredient';
import { FloorRoute } from './floor-router';
import FloorController from '../controllers/floor';
import { InferenceRoute } from './inference-router';
import InferenceController from '../controllers/inference';

export const Routes = (init: ApiInitializer) => {
  CourseRoute(init.getApp(), new CourseController());
  RecipeRoute(init.getApp(), new RecipeController());
  TaskRoute(init.getApp(), new TaskController());
  UserRoute(init.getApp(), new UserController());
  AuthRoute(init.getApp(), new AuthController());
  ImageRoute(init.getApp(), new ImageController());
  ProgressRoute(init.getApp(), new ProgressController());
  IngredientRoute(init.getApp(), new IngredientController());
  FloorRoute(init.getApp(), new FloorController());
  InferenceRoute(init.getApp(), new InferenceController());
};
