import { Request, Response, NextFunction } from 'express';
import { logger } from '../../app';
import Class from '../../schema/classSchema';

class ClassController {
    index = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const classes = await Class.find({ isDeleted: false }).select([
                'className',
                'classId',
            ]);

            if (!classes)
                return res.status(404).json({
                    status: 404,
                    message: 'Classes not found',
                });

            res.status(200).json({
                status: 200,
                data: classes,
                message: 'get classes successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { className } = req.body;

            const createNewClass = await Class.create({
                className: className,
            });

            if (!createNewClass)
                return res
                    .status(400)
                    .json({ status: 400, message: 'Class not created' });

            res.status(200).json({
                status: 200,
                message: 'Class created successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default ClassController;
