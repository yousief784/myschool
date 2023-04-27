import { Request, Response, NextFunction } from 'express';
import { logger } from '../../app';
import Course from '../../schema/courseSchema';
import Class from '../../schema/classSchema';
import Teacher from '../../schema/teacherSchema';
import User from '../../schema/userSchema';
import { Types } from 'mongoose';

class CourseController {
    index = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const courses = await Course.find({ isDeleted: false })
                .select(['courseName', 'courseId'])
                .populate([
                    {
                        path: 'classId',
                        model: Class,
                        select: ['_id', 'className'],
                    },
                    {
                        path: 'teacher',
                        model: Teacher,
                        select: ['_id', 'user'],
                        populate: {
                            path: 'user',
                            model: User,
                            select: ['_id', 'fullname'],
                        },
                    },
                ]);

            if (!courses)
                return res.status(404).json({
                    status: 404,
                    message: 'Courses not found',
                });

            res.status(200).json({
                status: 200,
                data: courses,
                message: 'get courses successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { courseName, classId, teacherId, numberOfTimesPerWeek } =
                req.body;
            let teacherNumberOfLessonsPerWeek: number = 0;

            if (!(courseName && classId && teacherId && numberOfTimesPerWeek))
                return res
                    .status(400)
                    .json({ stauts: 400, message: 'Send valid data' });

            const isExistClass = await Course.find({
                classId: classId,
            }).count();

            if (isExistClass) {
                const numberOfTimesPerWeekCount: number =
                    await Course.aggregate([
                        { $match: { classId: new Types.ObjectId(classId) } },
                        {
                            $group: {
                                _id: null,
                                total: { $sum: '$numberOfTimesPerWeek' },
                            },
                        },
                    ]).then((data) => {
                        return data[0].total;
                    });

                if (
                    numberOfTimesPerWeekCount + numberOfTimesPerWeek > 30 ||
                    numberOfTimesPerWeek < 0
                )
                    return res.status(400).json({
                        status: 400,
                        message:
                            'Invalid number of times per week is more than 30 lesson',
                    });
            }

            const isClassExist = await Class.findOne({
                _id: classId,
                isDeleted: false,
            }).count();

            if (!isClassExist)
                return res
                    .status(404)
                    .json({ status: 404, message: 'This class not exist' });

            const isTeacherExist = await Teacher.findOne({
                _id: teacherId,
                isDeleted: false,
            }).then((data: any) => {
                teacherNumberOfLessonsPerWeek =
                    data.numberOfLessons + numberOfTimesPerWeek;
                return data;
            });

            if (!isTeacherExist || teacherNumberOfLessonsPerWeek > 20)
                return res.status(404).json({
                    status: 404,
                    message:
                        'Teacher not exist or number of lessons more than 20',
                });

            const createNewCourse = await Course.create({
                courseName: courseName,
                classId: classId,
                teacher: teacherId,
                numberOfTimesPerWeek: numberOfTimesPerWeek,
            });

            const updateTeacher = await Teacher.findOneAndUpdate(
                {
                    _id: teacherId,
                    isDeleted: false,
                },
                {
                    $push: { courses: createNewCourse._id },
                    numberOfLessons: teacherNumberOfLessonsPerWeek,
                },
                { runValidators: true }
            );

            if (!createNewCourse)
                return res
                    .status(400)
                    .json({ status: 400, message: 'Course not created' });

            res.status(200).json({
                status: 200,
                message: 'Course created successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default CourseController;
