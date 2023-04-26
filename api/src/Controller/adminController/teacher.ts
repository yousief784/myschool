import { NextFunction, Request, Response } from 'express';
import { logger } from '../../app';
import User from '../../schema/userSchema';
import Teacher from '../../schema/teacherSchema';

class AdminTeacherController {
    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const teachers = await Teacher.find({ isDeleted: false }).populate({
                path: 'user',
                model: User,
                select: ['_id', 'fullname', 'nationalID'],
            });

            if (!(teachers && teachers.length))
                return res.status(404).json({
                    status: 404,
                    message: 'No Teachers available',
                });

            res.status(200).json({
                status: 200,
                data: teachers,
                message: 'Teacher returns successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { fullname, nationalID } = req.body;

            if (!(fullname && nationalID))
                return res.status(400).json({
                    status: 400,
                    message: 'send fullname and nationalID',
                });

            const user = await User.create({
                fullname: fullname,
                nationalID: nationalID,
            }).then((user: any) => {
                user.setPassword(nationalID, (err: any, user: any) => {
                    if (err) {
                        return next(err);
                    } else {
                        return user
                            .save()
                            .then((savedUser: any) => {
                                return savedUser;
                            })
                            .catch((error: any) => {
                                logger.error('An error occurred', {
                                    error: error,
                                });
                                return next(error);
                            });
                    }
                });
                return user;
            });

            if (!user)
                return res.status(400).json({
                    status: 400,
                    message: "Can't create teacher",
                });

            const teacher = await Teacher.create({ user: user._id });

            if (!teacher)
                return res.status(400).json({
                    status: 400,
                    message: "Can't create teacher",
                });

            res.status(200).json({
                status: 200,
                message: 'Teacher created successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default AdminTeacherController;
