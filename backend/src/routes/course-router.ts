import { Express } from "express";
import CourseController from "../controllers/course";

export const CourseRoute = (app: Express, controller: CourseController) => {
    /**
     * @swagger
     * /course/progress:
     *  post:
     *   description: Post a progress update
     *   tags: [Course, Progress]
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        data:
     *         type: object
     *         example: {"any":"thing"}
     *   responses:
     *    200:
     *     description: Success
     */
    app.post("/course/progress", controller.submitProgress);
    /**
     * @swagger
     * /course/progress:
     *  get:
     *   description: Get all progress updates
     *   tags: [Course, Progress]
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/course/progress", controller.getAllProgress);
    /**
     * @swagger
     * /course:
     *  get:
     *   description: Get all the courses
     *   tags: [Course]
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/course", controller.getAll);
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
    app.get("/course/:courseId", controller.get);
    /**
     * @swagger
     * /course:
     *  post:
     *   description: Get a course by id
     *   tags: [Course]
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        name:
     *         type: string
     *         example: First Course
     *        description:
     *         type: string
     *         example: This is the first of many courses
     *   responses:
     *    200:
     *     description: Success
     */
    app.post("/course", controller.create);
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
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        name:
     *         type: string
     *         example: First Course
     *        description:
     *         type: string
     *         example: This is the first of many courses
     *   responses:
     *    200:
     *     description: Success
     */
    app.put("/course/:courseId", controller.update);
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
    app.delete("/course/:courseId", controller.delete);
}