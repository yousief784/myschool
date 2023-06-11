import { NextFunction, Request, Response } from 'express';
import { logger } from '../../app';
import Teacher from '../../schema/teacherSchema';
import { getDateTimeNow } from '../../utils/getDateTimeNow';
import ClassSchedule from '../../schema/classScheduleSchema';
import Student from '../../schema/studentSchema';
import User from '../../schema/userSchema';
import { IClassSchedule } from '../../interfaces/classSchedule.interface';
import Attendance from '../../schema/attendanceSchema';
import Course from '../../schema/courseSchema';
import Class from '../../schema/classSchema';

class AttendanceController {
    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const attendance = await Attendance.find({
                attendance: null,
                isDeleted: false,
            })
                .select(['_id'])
                .populate([
                    {
                        path: 'classSchedule',
                        model: 'ClassSchedule',
                    },
                ])
                .then(async (attend: any) => {
                    return attend;
                });

        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    getStudentsInThisClass = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const authToken = req.header('Authorization')?.split(' ')[1];
            const user = await User.findOne({ authToken: authToken });
            if (!user?._id) {
                return res.status(400).json({
                    status: 400,
                    message: 'Send user id',
                });
            }
            const teacher = await Teacher.findOne({ user: user?._id });

            if (!teacher)
                return res.status(400).json({
                    status: 400,
                    message: 'Send a vaild user id',
                });

            const date = getDateTimeNow();

            const classNow = await ClassSchedule.findOne({
                teacher: teacher._id,
                dayOfWeek: date.weekday,
                startTime: date.startTime,
            });

            if (!classNow)
                return res
                    .status(404)
                    .json({ status: 404, message: 'Not found class now' });

            const studentsInThisClass = await Student.find({
                class: classNow.classId,
                isDeleted: false,
            })
                .select(['_id', 'studentId', 'class'])
                .populate([
                    {
                        path: 'user',
                        model: 'User',
                        select: ['_id', 'fullname'],
                    },
                ]);

            if (!studentsInThisClass.length)
                return res.status(404).json({
                    status: 404,
                    message: 'No Students in this class right now.',
                });

            res.status(200).json({
                status: 200,
                data: studentsInThisClass,
                message: 'Success!',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { studentId } = req.params;
            const authToken = req.header('Authorization')?.split(' ')[1];
            const user = await User.findOne({ authToken: authToken });
            if (!user?._id) {
                return res.status(400).json({
                    status: 400,
                    message: 'Send user id',
                });
            }
            const teacher = await Teacher.findOne({ user: user?._id });

            if (!teacher)
                return res.status(400).json({
                    status: 400,
                    message: 'Send a vaild user id',
                });

            const student = await Student.findOne({ _id: studentId });

            const date = getDateTimeNow();

            const classNow = await ClassSchedule.findOne({
                teacher: teacher._id,
                dayOfWeek: date.weekday,
                startTime: date.startTime,
            });

            if (!classNow)
                return res
                    .status(404)
                    .json({ status: 404, message: 'Not found class now' });

            const studentsInThisClass = await Student.find({
                class: classNow.classId,
                isDeleted: false,
            })
                .select(['_id', 'studentId'])
                .populate([
                    {
                        path: 'user',
                        model: 'User',
                        select: ['_id', 'fullname'],
                    },
                ]);

            if (!studentsInThisClass.length)
                return res.status(404).json({
                    status: 404,
                    message: 'No Students in this class right now.',
                });

            res.status(200).json({
                status: 200,
                data: studentsInThisClass,
                message: 'Success!',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { classId } = req.params;
            const authToken = req.header('Authorization')?.split(' ')[1];
            const user = await User.findOne({
                authToken: authToken,
            });
            if (!user?._id) {
                return res.status(400).json({
                    status: 400,
                    message: 'Send user id',
                });
            }

            // Get the current date
            const today = new Date();

            // Get the day of the week (0-6)
            const dayOfWeek = today.getDay();

            // Calculate the date of the first day of the week (Sunday)
            const firstDay = new Date(today);
            firstDay.setDate(today.getDate() - dayOfWeek);

            // Calculate the date of the last day of the week (Saturday)
            const lastDay = new Date(today);
            lastDay.setDate(today.getDate() + (6 - dayOfWeek));

            const teacher = await Teacher.findOne({
                user: user?._id,
            });

            if (!teacher)
                return res.status(400).json({
                    status: 400,
                    message: 'Send a vaild user id',
                });

            const isAttendanceSet = await Attendance.find({
                class: classId,
                teacher: teacher._id,
                date: { $gte: firstDay, $lte: lastDay },
            });

            if (isAttendanceSet.length) {
                return res.status(404).json({
                    status: 404,
                    message: 'Attendance already set for this week',
                });
            }

            const classSchedules = await ClassSchedule.find({
                teacher: teacher._id,
                classId: classId,
                isDeleted: false,
            }).sort({ startTime: 1 });

            if (!classSchedules.length)
                return res.status(400).json({
                    status: 400,
                    message: 'No Class Found for auth teacher',
                });

            const date = getDateTimeNow();

            const studentsInThisClass = await Student.find({
                class: classId,
                isDeleted: false,
            });

            const daysOfWeek = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                // 'Friday',
            ];

            let firstLessonInWeek: any = {};
            let lessonNumber = 0;

            for (let day of daysOfWeek) {
                firstLessonInWeek = classSchedules.find(
                    (item) => item.dayOfWeek == day
                );
                if (firstLessonInWeek) break;
            }

            // if (
            //     date.weekday == firstLessonInWeek.dayOfWeek &&
            //     date.startTime == firstLessonInWeek.startTime
            // ) {

            if (
                date.weekday == firstLessonInWeek.dayOfWeek &&
                date.startTime == firstLessonInWeek.startTime
            ) {
                const attendances = [];

                for (let student of studentsInThisClass) {
                    for (let classSchedule of classSchedules) {
                        const date = new Date();
                        switch (classSchedule.dayOfWeek) {
                            case 'Sunday':
                                date.setDate(date.getDate() - date.getDay());
                                break;
                            case 'Monday':
                                date.setDate(
                                    date.getDate() - date.getDay() + 1
                                );
                                break;
                            case 'Tuesday':
                                date.setDate(
                                    date.getDate() - date.getDay() + 2
                                );
                                break;

                            case 'Wednesday':
                                date.setDate(
                                    date.getDate() - date.getDay() + 3
                                );
                                break;
                            case 'Thursday':
                                date.setDate(
                                    date.getDate() - date.getDay() + 4
                                );
                                break;
                            case 'Friday':
                                date.setDate(
                                    date.getDate() - date.getDay() + 5
                                );
                                break;
                            default:
                                null;
                                break;
                        }
                        const attendance = new Attendance({
                            student: student._id,
                            classSchedule: classSchedule._id,
                            teacher: teacher._id,
                            class: classId,
                            date: date,
                            attendance: null,
                        });

                        attendances.push(attendance);
                    }
                }

                const createAttendance = await Attendance.insertMany(
                    attendances
                );
            } else {
            }
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    getStudentAttendance = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { studentId } = req.params;

            const authToken = req.header('Authorization')?.split(' ')[1];
            const user = await User.findOne({
                authToken: authToken,
            });
            if (!user?._id) {
                return res.status(400).json({
                    status: 400,
                    message: 'Send user id',
                });
            }

            const teacher = await Teacher.findOne({ user: user._id });
            const student = await Student.findOne({ _id: studentId });

            const date = getDateTimeNow();

            const studentAttendance = await Attendance.find({
                student: studentId,
                teacher: teacher?._id,
                class: student?.class,
                isDeleted: false,
            })
                .select(['_id', 'attendance', 'date'])
                .sort({ date: 1 })
                .populate([
                    {
                        path: 'classSchedule',
                        model: ClassSchedule,
                        select: ['_id', 'startTime'],
                        populate: {
                            path: 'course',
                            model: Course,
                            select: 'numberOfTimesPerWeek',
                        },
                    },
                ]);

            if (!studentAttendance)
                return res
                    .status(404)
                    .json({ status: 404, message: 'Student not found' });

            res.status(200).json({
                status: 200,
                data: studentAttendance,
                message: 'Success',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    setStudentAttendanceToday = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { attendId, attendStatus } = req.body;

            if (
                attendStatus != 'attend' &&
                attendStatus != 'absent' &&
                !attendId
            )
                return res.status(400).json({
                    status: 400,
                    message:
                        "send and attendStatus ('attend', 'absent') or attendId",
                });

            const isAttendanceExist = await Attendance.findOne({
                _id: attendId,
                isDeleted: false,
            }).count();

            if (!isAttendanceExist)
                return res.status(400).json({
                    status: 400,
                    message: 'Send a valid attendace id',
                });

            const updateAttendance = await Attendance.findOneAndUpdate(
                { _id: attendId },
                { attendance: attendStatus },
                { new: true }
            );

            if (!updateAttendance)
                return res.status(400).json({
                    status: 400,
                    message: "Can't update attendance",
                });

            return res.status(200).json({
                status: 200,
                message: 'Attendance updated successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default AttendanceController;
