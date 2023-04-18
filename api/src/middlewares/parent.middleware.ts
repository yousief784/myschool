import { Request, Response, NextFunction } from 'express';
import Parent from '../schema/parentSchema';

const parentMiddleware = async (
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

    const isParent = await Parent.findOne({ user: userAuthenticated });
    isParent
        ? next()
        : res.status(403).json({
              status: 403,
              message: 'Does not have parent permission',
          });
};

export default parentMiddleware;
