import { Express } from "express";
import multer from "multer";
import ImageController from "../controllers/image";

export const ImageRoute = (app: Express, controller: ImageController) => {
  const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // keep images size < 10 MB
    },
  });
  
  /**
     * @swagger
     * /upload:
     *  post:
     *   description: Upload an Image
     *   tags: [User]
     *   requestBody:
     *    required: true,
     *    content:
     *     multipart/form-data:
     *      schema:
     *        type: object
     *        properties:
     *          file:
     *            type: string
     *            format: binary
     *   responses:
     *    200:
     *     description: Success
     */
  app.post("/upload", uploader.single('file'), controller.uploadProfileImage)

  /**
     * @swagger
     * /upload/{username}:
     *  get:
     *   description: Get profile image for user
     *   tags: [User]
     *   parameters:
     *    - in: path
     *      name: username
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
  app.get("/upload/:username", controller.downloadProfileImage)
}