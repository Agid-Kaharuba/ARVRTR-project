import { Express } from "express";
import IngredientController from "../controllers/ingredient";
import ingredient from "../model/ingredient";

export const IngredientRoute = (app: Express, controller: IngredientController) => {
    app.get("/ingredient", controller.getAll);


    app.get("/ingredient/:ingredientId", controller.get);


    app.post("/ingredient", ingredient.create);


    app.put("/ingredient/:ingredientId", controller.update);


    app.delete("/ingredient/:ingredientId", controller.delete);

    /**
     * @swagger
     * /user:
     *  get:
     *   description: Get all the courses
     *   tags: [User]
     *   responses:
     *    200:
     *     description: Success
     */
    //app.get("/course", controller.getAll);
    /**
     * @swagger
     * /course/{courseId}:
     *  get:
     *   description: Get a course by id
     *   tags: [Course]
     *   parameters:
     *    - in: path
     *      name: courseId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
   // app.get("/course/:courseId", controller.get);
    /**
     * @swagger
     * /course:
     *  post:
     *   description: Get a course by id
     *   tags: [Course]
     *   parameters:
     *    - in: formData
     *      name: name
     *      required: true
     *      type: string
     *    - in: formData
     *      name: description
     *      required: false
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
   // app.post("/course", controller.create);
    /**
     * @swagger
     * /course/{courseId}:
     *  put:
     *   description: Update a course by id
     *   tags: [Course]
     *   parameters:
     *    - in: path
     *      name: courseId
     *      required: true
     *      type: string
     *    - in: formData
     *      name: name
     *      required: true
     *      type: string
     *    - in: formData
     *      name: description
     *      required: false
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
   // app.put("/course/:courseId", controller.update);
    /**
     * @swagger
     * /course/{courseId}:
     *  delete:
     *   description: Get a course by id
     *   tags: [Course]
     *   parameters:
     *    - in: path
     *      name: courseId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
   // app.delete("/course/:courseId", controller.delete);
}