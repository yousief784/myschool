import { NextFunction, Request, Response } from 'express';
import Teacher from '../../schema/teacherSchema';
import { logger } from '../../app';

class TeacherController {
    getTeacherData = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { userId } = req.params;
            const student = await Teacher.findOne({
                user: userId,
                isDeleted: false,
            }).select(['_id']);

            if (!student)
                return res.status(404).json({
                    status: 404,
                    message: `No Teacher`,
                });

            res.status(200).json({
                status: 200,
                data: student,
                message: `get teacher data successfully`,
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default TeacherController;
