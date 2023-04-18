import { Request, Response, NextFunction } from 'express';
import { logger } from '../../app';
import Course from '../../schema/courseSchema';
import Class from '../../schema/classSchema';

class CourseController {
    index = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const courses = await Course.find({isDeleted: false}).select([
                'courseName',
                'courseId',
            ]);

            if (!courses)
                return res.status(404).json({
                    status: 404,
                    message: 'Courses not found',
                });

            res.status(200).json({
                status: 200,
                data: courses,
                message: 'get courses successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { courseName, classId } = req.body;

            const isClassFound = await Class.findOne({
                _id: classId,
                isDeleted: false,
            }).count();

            if (!isClassFound)
                return res
                    .status(400)
                    .json({ status: 400, message: 'This class not exist' });

            const createNewCourse = await Course.create({
                courseName: courseName,
                classId: classId,
            });

            if (!createNewCourse)
                return res
                    .status(400)
                    .json({ status: 400, message: 'Course not created' });

            res.status(200).json({
                status: 200,
                message: 'Course created successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default CourseController;
