import { Request, Response, NextFunction } from 'express';
import Admin from '../schema/adminSchema';
import User from '../schema/userSchema';

const adminMiddleware = async (
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

    const isAdmin = await Admin.findOne({ user: user._id });
    isAdmin
        ? next()
        : res
              .status(403)
              .json({ status: 403, message: 'Does not have admin permission' });
};

export default adminMiddleware;
