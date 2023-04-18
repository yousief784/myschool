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
        console.log(showUser);

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

    // async update(req: Request, res: Response): Promise<void | object> {
    //     try {
    //         let passwordChangedHasError = false;
    //         let message: string = '';
    //         const {
    //             firstName,
    //             lastName,
    //             userGender,
    //             oldPassword,
    //             newPassword,
    //         } = req.body;
    //         const authToken = req.header('authorization')?.split(' ')[1];

    //         const updatedUser = await User.findOneAndUpdate(
    //             { authToken: authToken },
    //             {
    //                 firstName,
    //                 lastName,
    //                 userGender,
    //             },
    //             {
    //                 runValidators: true,
    //                 new: true,
    //             }
    //         ).then((data: any) => {
    //             if (oldPassword != undefined && newPassword != undefined) {
    //                 data.changePassword(
    //                     oldPassword,
    //                     newPassword,
    //                     (err: any, data: any) => {
    //                         if (err) {
    //                             console.log(err);
    //                             return;
    //                         }
    //                         console.log('inkl');

    //                         passwordChangedHasError = true;
    //                         message =
    //                             "password not updated old password isn't valid";
    //                         data.save();
    //                         return data;
    //                     }
    //                 );
    //             }

    //             return data;
    //         });
    //         console.log(message);

    //         console.log(passwordChangedHasError);

    //         message =
    //             !passwordChangedHasError && 'your data update successfully';

    //         return res.status(200).json({
    //             status: 200,
    //             message: message,
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             status: 500,
    //             message: err,
    //         });
    //     }
    // }

    // async delete(req: Request, res: Response): Promise<void | object> {}

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user && Object.assign(req.user);
            let role: string = '';
            if (!user) {
                const error = new Error('An error occurred.');

                return next(error);
            }

            const isAdmin = await Admin.findOne({ user: user.id }).count();
            const isStudent = await Student.findOne({ user: user.id }).count();
            const isParent = await Parent.findOne({ user: user.id }).count();
            const isTeacher = await Teacher.findOne({ user: user.id }).count();

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
