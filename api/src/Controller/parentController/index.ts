import { NextFunction, Request, Response } from 'express';
import { logger } from '../../app';
import User from '../../schema/userSchema';
import Parent from '../../schema/parentSchema';
import Student from '../../schema/studentSchema';
import Result from '../../schema/resultSchema';
import Class from '../../schema/classSchema';
import Course from '../../schema/courseSchema';

class ParentController {
    getChildren = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authToken = req.header('Authorization')?.split(' ')[1];
            const user = await User.findOne({ authToken: authToken });

            const childrenParent = await Parent.findOne({
                user: user!._id,
            })
                .select(['_id'])
                .populate([
                    {
                        path: 'students',
                        model: Student,
                        select: ['_id'],
                        populate: {
                            path: 'user',
                            model: User,
                            select: ['_id', 'fullname'],
                        },
                    },
                ]);

            if (!childrenParent)
                res.status(404).json({
                    status: 404,
                    message: 'Not students for this parent',
                });

            res.status(200).json({
                status: 200,
                data: childrenParent,
                message: 'Get children successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    getStudentResult = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { studentId } = req.params;

            if (!studentId)
                return res
                    .status(400)
                    .json({ status: 400, message: 'Send student id' });

            const isStudentExist = await Student.countDocuments({
                _id: studentId,
            });

            if (!isStudentExist)
                return res
                    .status(400)
                    .json({ status: 400, message: 'Send valid student id' });

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

export default ParentController;
