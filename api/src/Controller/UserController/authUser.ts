import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../../config';
import User from '../../schema/userSchema';
import Admin from '../../schema/adminSchema';
import { USER_ROLE } from '../../interfaces/user.interface';
import Student from '../../schema/studentSchema';
import Parent from '../../schema/parentSchema';
import Teacher from '../../schema/teacherSchema';

class AuthController {
    show = async (req: Request, res: Response): Promise<void | object> => {
        const authToken = req.header('Authorization')?.split(' ')[1];

        const showUser = await User.findOne({
            authToken: authToken,
            isDeleted: false,
        }).select(['_id', 'fullname', 'parentName', 'nationalID']);

        if (!showUser)
            return res.status(404).json({
                status: 404,
                message: 'User not found',
            });

        res.status(200).json({
            status: 200,
            data: showUser,
            message: 'success',
        });
    };


    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user && Object.assign(req.user);

            let role: string = '';
            if (!user) {
                const error = new Error('An error occurred.');

                return next(error);
            }

            const isAdmin = await Admin.findOne({ user: user._id }).count();
            const isStudent = await Student.findOne({ user: user._id }).count();
            const isParent = await Parent.findOne({ user: user._id }).count();
            const isTeacher = await Teacher.findOne({ user: user._id }).count();

            if (isAdmin) {
                role = USER_ROLE.ADMIN;
            }

            if (isStudent) {
                role = USER_ROLE.STUDENT;
            }

            if (isParent) {
                role = USER_ROLE.PARENT;
            }

            if (isTeacher) {
                role = USER_ROLE.TEACHER;
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user!._id, nationalID: user.nationalID };
                const token = jwt.sign(
                    { user: body },
                    config.authTokenSecret as string
                );

                await User.findOneAndUpdate(
                    { nationalID: user.nationalID },
                    { authToken: token }
                );

                return res.status(200).json({ status: 200, token, role });
            });
        } catch (error) {
            return next(error);
        }
    };

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.header('authorization')?.split(' ')[1];
            const user = await User.findOne({ authToken: token }).select(
                'nationalID'
            );
            req.logout(async function (err) {
                if (err) {
                    return next(err);
                }
                await User.findOneAndUpdate(
                    {
                        nationalID: user && user.nationalID,
                    },
                    { authToken: null }
                );
                res.status(200).json({
                    status: 200,
                    message: 'Loged Out Successfully',
                });
            });
        } catch (error) {
            return next(error);
        }
    };
}

export default AuthController;
