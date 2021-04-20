import { Express } from "express";
import UserController from "../controllers/user";
import { checkToken } from "../middleware/auth";

export const UserRoute = (app: Express, controller: UserController) => {
    /**
     * @swagger
     * /user/all:
     *  get:
     *   description: Get all the users
     *   tags: [User]
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/user/all", controller.getAll);
    /**
     * @swagger
     * /user:
     *  get:
     *   description: Get current user
     *   tags: [User]
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/user", checkToken, controller.get);
    /**
     * @swagger
     * /user/{userId}:
     *  get:
     *   description: Get a user by id
     *   tags: [User]
     *   parameters:
     *    - in: path
     *      name: userId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/user/:userId", controller.get);
    /**
     * @swagger
     * /user/{userId}:
     *  put:
     *   description: Get a user by id
     *   tags: [User]
     *   parameters:
     *    - in: path
     *      name: userId
     *      required: true
     *      type: string
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        username:
     *         type: string
     *         example: test123
     *        password:
     *         type: string
     *         example: password123
     *        newPassword:
     *         type: string
     *         example: password123
     *        firstname:
     *         type: string
     *         example: john
     *        lastname:
     *         type: string
     *         example: smith
     *        email:
     *         type: string
     *         example: test@test.com
     *        staffid:
     *         type: string
     *         example: abc123
     *        isSupervisor:
     *         type: boolean
     *         example: true
     *   responses:
     *    200:
     *     description: Success
     */
    app.put("/user/:userId", controller.update);
}
