import { Request, Response } from "express";
import User from "../model/user";
import jwt from "jsonwebtoken";
import ResponseService from "../helpers/response"
import { MongoError } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export default class AuthController {
    public async login(req: Request, res: Response) {
        const {
            username,
            password
        } = req.body;

        User.findOne({ username: username }, async function (err: Error, userIn: typeof User) {
          if (userIn){
            // @ts-ignore
            if (await userIn.checkPassword(password)) {
              const jwtPayload = {
                  userId: username,
                  password: password
              };
              const token = jwt.sign(jwtPayload, `${process.env.TOKEN_SECRET}`, {
                  expiresIn: "24h"
              });
              // @ts-ignore
              userIn.password = undefined;
              ResponseService.successResponse(res, {user: userIn, token: token});
            }
            else {
                ResponseService.mongoNotFoundResponse(res, "Username or password is incorrect");
            }
          }
          else{
            ResponseService.mongoNotFoundResponse(res, "Username or password is incorrect");
          }
      })
    }

    public async create(req: Request, res: Response) {
        const {
            username,
            password,
            firstname,
            lastname,
            email,
            stafid,
            isSupervisor
        } = req.body;

        const newUserRequest = new User({
            username,
            password,
            firstname,
            lastname,
            email,
            stafid,
            isSupervisor
        } as any);
        newUserRequest.save((err: MongoError) => {
			if (err) {
                err.code = 11000;
				ResponseService.mongoErrorResponse(res, err, "Username already exists in the database");
			} else {
				ResponseService.successResponse(res, newUserRequest);
			}
		});
    }
}