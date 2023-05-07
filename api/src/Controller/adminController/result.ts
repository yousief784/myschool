import { Request, Response, NextFunction } from 'express';
import { logger } from '../../app';
import Class from '../../schema/classSchema';
import Student from '../../schema/studentSchema';
import User from '../../schema/userSchema';
import Attendance from '../../schema/attendanceSchema';
import Course from '../../schema/courseSchema';

class ResultController {
    getStudentsAttendance = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { classId } = req.body;

            const studentsInClass = await Class.find({ _id: classId }).populate(
                [
                    {
                        path: 'students',
                        model: Student,
                        select: ['_id', 'studentId'],
                        populate: {
                            path: 'user',
                            model: User,
                            select: ['_id', 'fullname'],
                        },
                    },
                    {
                        path: 'courses',
                        model: Course,
                        select: ['_id', 'courseName'],
                    },
                ]
            );

            const attendance = await Attendance.find({
                class: classId,
            });

            res.status(200).json({
                data: studentsInClass,
            });
            console.log(studentsInClass);
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default ResultController;
