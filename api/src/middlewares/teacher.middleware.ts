import { Request, Response, NextFunction } from 'express';
import Teacher from '../schema/teacherSchema';

const teacherMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userAuthenticated = req.user && Object.assign(req.user)._id;
    if (userAuthenticated == undefined)
        return res.status(401).json({
            status: 401,
            message: 'You are Unauthorized',
        });

    const isTeacher = await Teacher.findOne({ user: userAuthenticated });
    isTeacher
        ? next()
        : res
              .status(403)
              .json({
                  status: 403,
                  message: 'Does not have teacher permission',
              });
};

export default teacherMiddleware;
