import { Request, Response, NextFunction } from 'express';
import { logger } from '../../app';
import ClassSchedule from '../../schema/classScheduleSchema';
import Course from '../../schema/courseSchema';

class TeacherScheduleController {
    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { teacherId } = req.params;

            const teacherSchedule = await ClassSchedule.find({
                teacher: teacherId,
                isDeleted: false,
            }).populate({
                path: 'course',
                model: Course,
                select: ['courseName'],
            });

            if (!teacherSchedule.length)
                return res.status(404).json({
                    status: 404,
                    message: 'Classes not found',
                });

            res.status(200).json({
                status: 200,
                data: teacherSchedule,
                message: 'get classes successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default TeacherScheduleController;
