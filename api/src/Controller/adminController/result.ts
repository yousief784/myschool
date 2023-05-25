import { Request, Response, NextFunction, response } from 'express';
import { logger } from '../../app';
import Class from '../../schema/classSchema';
import Student from '../../schema/studentSchema';
import User from '../../schema/userSchema';
import Attendance from '../../schema/attendanceSchema';
import Course from '../../schema/courseSchema';
import TermDate from '../../schema/termDateSchema';
import Teacher from '../../schema/teacherSchema';
import Result from '../../schema/resultSchema';

class ResultController {
    getStudentsInClass = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { classId } = req.params;

            if (!classId)
                return res
                    .status(400)
                    .json({ status: 400, message: 'send class id' });

            const studentsInClass = await Class.findOne({
                _id: classId,
            }).populate([
                {
                    path: 'students',
                    model: Student,
                    select: ['_id', 'studentId'],
                    populate: {
                        path: 'user',
                        model: User,
                        select: ['_id', 'fullname'],
                    },
                },
                {
                    path: 'courses',
                    model: Course,
                    select: ['_id', 'courseName', 'teacher'],
                },
            ]);

            if (!studentsInClass!.students.length)
                return res.status(404).json({
                    status: 404,
                    message: 'Not Found students in this class',
                });

            res.status(200).json({
                status: 200,
                data: studentsInClass,
                message: 'Get data successfully',
            });
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
            const { classId, teacherId, studentId } = req.query;

            if (!(classId && teacherId && studentId))
                return res.status(400).json({
                    status: 400,
                    message: 'send classId, teacherId, studentId',
                });

            const attendance = await Attendance.find({
                student: studentId,
                teacher: teacherId,
                class: classId,
                attendance: 'attend',
            }).count();

            const courseWork = await Course.findOne({
                teacher: teacherId,
                classId: classId,
            }).select(['courseWorkDegree', 'numberOfTimesPerWeek']);

            const numberOfWeeks = await TermDate.find().select([
                'numberOfWeeks',
            ]);

            const lessonDegree =
                courseWork!.courseWorkDegree /
                (numberOfWeeks[0].numberOfWeeks *
                    courseWork!.numberOfTimesPerWeek);

            console.log('lesson * attendance', lessonDegree * attendance);

            res.status(200).json({
                status: 200,
                courseWorkDegree: Math.ceil(lessonDegree * attendance),
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    setStudentResult = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const {
                studentId,
                teacherId,
                classId,
                courseWorkDegree,
                midTermDegree,
                finalDegree,
            } = req.body;

            console.log(
                'course work degree',
                finalDegree + midTermDegree + courseWorkDegree
            );
            console.log(courseWorkDegree);

            if (
                !(
                    studentId &&
                    teacherId &&
                    classId &&
                    courseWorkDegree &&
                    midTermDegree &&
                    finalDegree &&
                    finalDegree + midTermDegree + courseWorkDegree <= 100
                )
            )
                return res.status(400).json({
                    status: 400,
                    message: 'Send valid data',
                });

            console.log('no');

            const isStudentExist = await Student.countDocuments({
                _id: studentId,
            });

            const isTeacherExist = await Teacher.countDocuments({
                _id: teacherId,
            });

            const isClassExist = await Class.countDocuments({ _id: classId });

            if (!(isStudentExist && isTeacherExist && isClassExist))
                return res
                    .status(400)
                    .json({ status: 400, message: 'Send a valid data' });

            const isResultExist = await Result.updateMany(
                { student: studentId, teacher: teacherId, class: classId },
                { isDeleted: true },
                { new: true }
            );

            const setResult = await Result.create({
                student: studentId,
                teacher: teacherId,
                class: classId,
                courseWorkDegree: courseWorkDegree,
                midTermDegree: midTermDegree,
                finalDegree: finalDegree,
            });

            res.status(200).json({
                status: 200,
                message: 'Result set successfully',
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
            const { studentId, teacherId, classId } = req.query;

            if (!(studentId && teacherId && classId))
                return res
                    .status(400)
                    .json({ status: 400, message: 'Send a valid data' });

            const data = await Result.findOne({
                student: studentId,
                teacher: teacherId,
                class: classId,
                isDeleted: false,
            }).select([
                '_id',
                'courseWorkDegree',
                'midTermDegree',
                'finalDegree',
            ]);

            if (!data)
                return res
                    .status(404)
                    .json({ status: 404, message: 'Not Found Data' });

            res.status(200).json({
                status: 200,
                data: data,
                message: 'get data successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    showResult = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { classId } = req.body;
            if (!classId)
                return res
                    .status(400)
                    .json({ status: 400, message: 'Send class id' });

            const isClassExist = await Class.findOne({ _id: classId }).count();

            if (!isClassExist)
                return res
                    .status(400)
                    .json({ status: 400, message: 'Class not exits' });

            await Result.updateMany({ class: classId }, { showResult: true });

            res.status(200).json({
                status: 200,
                message: 'The result was shown to the parents and students',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    hideResult = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { classId } = req.body;
            if (!classId)
                return res
                    .status(400)
                    .json({ status: 400, message: 'Send class id' });

            const isClassExist = await Class.findOne({ _id: classId }).count();

            if (!isClassExist)
                return res
                    .status(400)
                    .json({ status: 400, message: 'Class not exits' });

            await Result.updateMany({ class: classId }, { showResult: false });

            res.status(200).json({
                status: 200,
                message: 'The result was hidden to the parents and students',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default ResultController;
