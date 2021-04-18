import { Express } from "express";
import AuthController from "../controllers/auth";
import { checkToken } from "../middleware/auth";

export const AuthRoute = (app: Express, controller: AuthController) => {
    /**
     * @swagger
     * /auth:
     *  get:
     *   description: Register a new user
     *   tags: [Auth]
     *   responses:
     *    200:
     *     description: Success
     */
    app.get('/auth', checkToken, (req, res) => res.status(200).send("you have auth"));
    /**
     * @swagger
     * /auth/register:
     *  post:
     *   description: Register a new user
     *   tags: [Auth]
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
    app.post('/auth/register', controller.create);
    /**
     * @swagger
     * /auth/login:
     *  post:
     *   description: Login
     *   tags: [Auth]
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
     *   responses:
     *    200:
     *     description: Success
     */
    app.post('/auth/login', controller.login);
}