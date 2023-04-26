import { Request, Response, NextFunction } from 'express';
import Parent from '../schema/parentSchema';
import User from '../schema/userSchema';

const parentMiddleware = async (
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

    const isParent = await Parent.findOne({ user: user._id });
    isParent
        ? next()
        : res
              .status(403)
              .json({ status: 403, message: 'Does not have admin permission' });
};

export default parentMiddleware;
