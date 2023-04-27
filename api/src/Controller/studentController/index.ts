import { NextFunction, Request, Response } from 'express';
import { logger } from '../../app';
import ClassSchedule from '../../schema/classScheduleSchema';
import Course from '../../schema/courseSchema';
import Student from '../../schema/studentSchema';
import TermDate from '../../schema/termDateSchema';

class StudentController {
    getSchedule = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { classId } = req.params;

            const schedule = await ClassSchedule.find({
                classId: classId,
            }).populate({
                path: 'course',
                model: Course,
                select: ['courseName'],
            });

            res.status(200).json({ status: 200, data: schedule });
        } catch (error) {
            logger.error('An error occurred', { error });
            return next(error);
        }
    };

    getCoursesForThisClass = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { classId } = req.params;
            const courses = await Course.find({
                classId: classId,
                isDeleted: false,
            });

            if (!courses)
                return res.status(404).json({
                    status: 404,
                    message: `No Courses in this class`,
                });

            res.status(200).json({
                status: 200,
                data: courses,
                message: `get courses successfully`,
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    getStudetData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params;
            const student = await Student.findOne({
                user: userId,
                isDeleted: false,
            });

            if (!student)
                return res.status(404).json({
                    status: 404,
                    message: `No Student`,
                });

            res.status(200).json({
                status: 200,
                data: student,
                message: `get student data successfully`,
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default StudentController;
