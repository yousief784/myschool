import { NextFunction, Request, Response } from 'express';
import { logger } from '../../app';
import ClassSchedule from '../../schema/classScheduleSchema';
import Course from '../../schema/courseSchema';
import Student from '../../schema/studentSchema';
import TermDate from '../../schema/termDateSchema';
import Result from '../../schema/resultSchema';
import Class from '../../schema/classSchema';

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

    getResult = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { studentId } = req.params;
            if (!studentId)
                return res.status(400).json({
                    status: 400,
                    message: 'Send studentId',
                });

            const isStudentExist = await Student.findOne({
                _id: studentId,
            }).count();
            if (!isStudentExist)
                return res.status(404).json({
                    status: 404,
                    message: "This student doesn't exist",
                });

            const result = await Result.find({
                student: studentId,
                showResult: true,
                isDeleted: false,
            }).populate([
                {
                    path: 'class',
                    model: Class,
                    select: ['_id'],
                    populate: {
                        path: 'courses',
                        model: Course,
                        select: ['_id', 'courseName', 'teacher'],
                    },
                },
            ]);

            if (!result.length)
                return res.status(404).json({
                    status: 404,
                    message: 'The result has not been announced',
                });

            res.status(200).json({
                status: 200,
                data: result,
                message: 'Get student result successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default StudentController;
