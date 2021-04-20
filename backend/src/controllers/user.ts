import { Request, Response } from "express";
import User from "../model/user";
import ResponseService from "../helpers/response"
import { MongoError } from "mongodb";
import bcrypt from "bcrypt";

export default class UserController {
    public async getAll(req: Request, res: Response) {
        try {
            const users = await User.find();
            ResponseService.successResponse(res, users);
        }
        catch (err) {
            ResponseService.mongoErrorResponse(res, err);
        }
    }

    public async get(req: Request, res: Response) {
        try {
            //@ts-ignore
            const id = req.params.userId || req.user._id;
            const user = await User.findOne({
                _id: id
            });
            ResponseService.successResponse(res, user);
        }
        catch (err) {
            ResponseService.mongoNotFoundResponse(res, err);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            //@ts-ignore
            const id = req.params.userId || req.user._id;
            const body = req.body;

            User.findOne({ _id: id }, async function (err: Error, user: typeof User) {
                if (user) {
                    // @ts-ignore
                    if (await user.checkPassword(body.password)) {
                        console.log("password is correct");
                        delete body.password;
                        if (body.newPassword) {
                            body.password = await bcrypt.hash(body.newPassword, 10);
                        }

                        const response = await User.updateOne({ _id: id }, { $set: { ...body } });

                        ResponseService.successResponse(res, "User updated");
                    }
                    else {
                        ResponseService.mongoNotFoundResponse(res, "Password is incorrect");
                    }
                }
                else {
                    ResponseService.mongoNotFoundResponse(res, "Username or password is incorrect");
                }
            })
        }
        catch (err) {
            ResponseService.mongoNotFoundResponse(res, err);
        }
    }
}