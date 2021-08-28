import { Request, Response } from 'express';
import Course from '../model/course';
import Progress from '../model/progress';
import ResponseService from '../helpers/response';
import mongoose from 'mongoose';

export default class CourseController {
  public async getAll(req: Request, res: Response) {
    // @ts-ignore
    const { user } = req;
    try {
      let courses;
      if (user.isSupervisor) {
        courses = await Course.find({ archive: { $ne: true } });
      } else {
        courses = await Course.find({ archive: { $ne: true }, assignedEmployees: user._id });
      }
      ResponseService.successResponse(res, courses);
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const course = await Course.findOne({ _id: req.params.courseId }).populate({
        path: 'tasks',
        populate: { path: 'recipe' },
      }).populate('assignedEmployees');

      ResponseService.successResponse(res, course);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  public async create(req: Request, res: Response) {
    const { body } = req;
    const newCourseRequest = new Course({
      name: body.name,
      description: body.description,
      image: body.image,
      tasks: body.tasks,
      assignedEmployees: body.assignedEmployees,
    } as any);
    newCourseRequest.save((err: any) => {
      if (err) {
        ResponseService.mongoErrorResponse(res, err);
      } else {
        ResponseService.successResponse(res, newCourseRequest);
      }
    });
  }

  public async update(req: Request, res: Response) {
    try {
      const id = req.params.courseId;
      const { body } = req;
      const response = await Course.updateOne({ _id: id }, { $set: { ...body } });
      ResponseService.successResponse(res, response);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = req.params.courseId;
      const response = await Course.updateOne({ _id: id }, { archive: true });
      ResponseService.successResponse(res, response);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  public async submitProgress(req: Request, res: Response) {
    const { data, userId, taskId, courseId, completed, score } = req.body;
    const newProgressRequest = new Progress({
      data: data,
      userId: (userId),
      taskId: (taskId),
      courseId: (courseId),
      completed: completed,
      score: score
    });
    newProgressRequest.save((err: any) => {
      if (err) {
        ResponseService.mongoErrorResponse(res, err);
      } else {
        ResponseService.successResponse(res, newProgressRequest);
      }
    });
  }

  public async getAllProgress(req: Request, res: Response) {
    try {
      const progresses = await Progress.find();
      ResponseService.successResponse(res, progresses);
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }
}
