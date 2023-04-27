import { Request, Response, NextFunction } from 'express';
import Teacher from '../schema/teacherSchema';
import User from '../schema/userSchema';

const teacherMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authToken = req.header('Authorization')?.split(' ')[1];
    const user = await User.findOne({ authToken: authToken });
    if (!user)
        return res.status(401).json({
            status: 401,
            message: 'You are Unauthorized',
        });

    const isTeacher = await Teacher.findOne({ user: user._id });
    isTeacher
        ? next()
        : res
              .status(403)
              .json({ status: 403, message: 'Does not have admin permission' });
};

export default teacherMiddleware;
