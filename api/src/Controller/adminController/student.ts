import { NextFunction, Request, Response } from 'express';
import { logger } from '../../app';
import Student from '../../schema/studentSchema';
import User from '../../schema/userSchema';
import Parent from '../../schema/parentSchema';
import Class from '../../schema/classSchema';

class AdminStudentController {
    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { classId } = req.params;

            if (!classId)
                return res.status(404).json({
                    status: 404,
                    message: 'Class id not found',
                });

            const classIdIsFound = await Class.findOne({
                _id: classId,
                isDeleted: false,
            }).count();

            if (!classIdIsFound)
                return res.status(404).json({
                    status: 404,
                    message: 'Class not found',
                });

            const studentInThisClass = await Student.find({
                class: classId,
                isDeleted: false,
            })
                .populate([
                    {
                        path: 'user',
                        model: User,
                        select: ['fullname', 'nationalID'],
                    },
                    {
                        path: 'class',
                        model: Class,
                        select: ['className', 'classId'],
                    },
                ])
                .populate([
                    {
                        path: 'parent',
                        model: Parent,
                        select: ['parentPhone'],
                        populate: [
                            {
                                path: 'user',
                                model: User,
                                select: ['parentName', 'nationalID'],
                            },
                        ],
                    },
                ])
                .select(['_id', 'classId', 'studentId']);

            if (!studentInThisClass)
                return res.status(404).json({
                    status: 404,
                    message: 'not found student in this class',
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

    addStudent = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<object | void> => {
        try {
            const {
                fullname,
                parentNationalID,
                studentNationalID,
                classId,
                parentPhone,
            } = req.body;
            let studentAlreadyExist = false;

            if (
                !(
                    fullname &&
                    parentNationalID &&
                    studentNationalID &&
                    classId &&
                    parentPhone
                )
            )
                return res.status(400).json({
                    status: 400,
                    message:
                        'Invalid body check if you send fullname, parentNationalID and studentNationalID',
                });

            const classIdIsFound = await Class.findOne({
                _id: classId,
                isDeleted: false,
            });

            if (!classIdIsFound) {
                return res.status(404).json({
                    stauts: 404,
                    message: 'Invalid class id or not found',
                });
            }

            //check if student is already exist or not if not exist create new user as student
            const addUser = await User.findOne({
                nationalID: studentNationalID,
                isDeleted: false,
            }).then(async (existingUser: any) => {
                if (existingUser) studentAlreadyExist = true;
                else {
                    return await User.create({
                        fullname: fullname,
                        nationalID: studentNationalID,
                    }).then((user: any) => {
                        user.setPassword(
                            studentNationalID,
                            (err: any, user: any) => {
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
                            }
                        );
                        return user;
                    });
                }
            });

            if (studentAlreadyExist)
                return res.status(400).json({
                    status: 400,
                    message: 'Student already exists',
                });

            console.log(classIdIsFound);

            const newStudent = await Student.create({
                user: addUser,
                class: classIdIsFound!._id,
            });

            const newParent = await User.findOne({
                nationalID: parentNationalID,
                isDeleted: false,
            }).then(async (existingParent: any) => {
                if (existingParent) {
                    const parent = await Parent.findOne({
                        user: existingParent._id,
                        isDeleted: false,
                    }).then((data: any) => {
                        data.students.push(newStudent);
                        return data.save();
                    });
                    return existingParent;
                } else {
                    const parentName = this.partentName(fullname);
                    return await User.create({
                        parentName: parentName,
                        nationalID: parentNationalID,
                    }).then(async (user: any) => {
                        user.setPassword(
                            parentNationalID,
                            (err: any, user: any) => {
                                if (err) {
                                    return next(err);
                                } else {
                                    user.save()
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
                            }
                        );

                        // parent connected to students in _id column student model and student connected to his parent in _id column parent model
                        return await Parent.create({
                            user: user._id,
                            parentPhone: parentPhone,
                        }).then((data: any) => {
                            newStudent.parent = data._id;
                            newStudent.save();
                            data.students.push(newStudent);
                            return data.save();
                        });
                    });
                }
            });

            // console.log(newParen / t);

            if (!newParent)
                return res.status(400).json({
                    status: 400,
                    message: 'parent not created',
                });

            return res.status(200).json({
                status: 200,
                message: 'student created successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params;

            const isStudentExist = await User.findOne({
                _id: userId,
                isDeleted: false,
            }).count();

            if (!isStudentExist)
                return res.status(400).json({
                    status: 400,
                    message: `Student Not Exist`,
                });

            const deleteUser = await User.findOneAndUpdate(
                {
                    _id: userId,
                    isDeleted: false,
                },
                {
                    isDeleted: true,
                },
                { new: true }
            );

            const deleteStudent = await Student.findOneAndUpdate(
                {
                    user: userId,
                    isDeleted: false,
                },
                { isDeleted: true },
                { new: true }
            );

            if (!(deleteUser && deleteStudent))
                return res.status(400).json({
                    status: 400,
                    message: `Can't remove this student try again later`,
                });

            res.status(200).json({
                status: 200,
                message: `Student Remove Successfully`,
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    private partentName = (studentName: string) => {
        return studentName.split(' ').slice(1).join(' ');
    };
}

export default AdminStudentController;
