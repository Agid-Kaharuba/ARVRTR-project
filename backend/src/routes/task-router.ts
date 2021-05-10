import { Express } from "express";
import TaskController from "../controllers/task";

export const TaskRoute = (app: Express, controller: TaskController) => {

    /**
     * @swagger
     * /task:
     *  get:
     *   description: Get all tasks
     *   tags: [Task]
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/task", controller.getAll);

    /**
     * @swagger
     * /task:
     *  post:
     *   description: Create a task
     *   tags: [Task]
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        name:
     *         type: string
     *         example: First Task
     *        description:
     *         type: string
     *         example: Boil water
     *        recipe:
     *         type: string
     *         example: recipe01
     *        type:
     *         type: string
     *         example: liquid
     *   responses:
     *    200:
     *     description: Success
     */
    app.post("/task", controller.create);

    /**
     * @swagger
     * /task/{taskId}:
     *  get:
     *   description: Get all tasks by name
     *   tags: [Task]
     *   parameters:
     *    - in: path
     *      name: taskId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/task/:taskId", controller.get);

    /**
     * @swagger
     * /task/{taskId}:
     *  put:
     *   description: Update a task by id
     *   tags: [Task]
     *   parameters:
     *    - in: path
     *      name: taskId
     *      required: true
     *      type: string
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        name:
     *         type: string
     *         example: First Task
     *        description:
     *         type: string
     *         example: Boil water
     *        type:
     *         type: string
     *         example: liquid
     *        recipe:
     *         type: string
     *         example: recipe01
     *   responses:
     *    200:
     *     description: Success
     */
    app.put("/task/:taskId", controller.update);

    /**
     * @swagger
     * /task/{taskId}:
     *  delete:
     *   description: Delete a task
     *   tags: [Task]
     *   parameters:
     *    - in: path
     *      name: taskId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.delete("/task/:taskId", controller.delete);
}