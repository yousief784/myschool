import { Request, Response, NextFunction } from 'express';
import { logger } from '../../app';
import Student from '../../schema/studentSchema';
import User from '../../schema/userSchema';
import Class from '../../schema/classSchema';

class TeacherStudentController {
    showStudentData = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { studentId } = req.params;

            if (!studentId)
                return res.status(404).json({
                    status: 404,
                    message: 'Class id not found',
                });

            const studentInThisClass = await Student.findOne({
                _id: studentId,
                isDeleted: false,
            })
                .populate([
                    {
                        path: 'user',
                        model: User,
                        select: ['fullname'],
                    },
                    {
                        path: 'class',
                        model: Class,
                        select: ['className'],
                    },
                ])
                .select(['_id', 'studentId']);

            // console.log(studentInThisClass);

            if (!studentInThisClass)
                return res.status(404).json({
                    status: 404,
                    message: 'not found this student',
                });

            res.status(200).json({
                status: 200,
                data: studentInThisClass,
                message: 'Get all student successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default TeacherStudentController;
