import { Request, Response, NextFunction } from 'express';
import Student from '../schema/studentSchema';

const studentMiddleware = async (
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

    const isStudent = await Student.findOne({ user: userAuthenticated });
    isStudent
        ? next()
        : res.status(403).json({
              status: 403,
              message: 'Does not have student permission',
          });
};

export default studentMiddleware;
