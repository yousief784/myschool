import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../app';
import generateRandomString from '../../../utils/generateRandomString';
import PDFDocument, { rect } from 'pdfkit';
import fs from 'fs';
import Class from '../../../schema/classSchema';
import Result from '../../../schema/resultSchema';
import Parent from '../../../schema/parentSchema';
import User from '../../../schema/userSchema';
import Student from '../../../schema/studentSchema';
import Course from '../../../schema/courseSchema';
import Teacher from '../../../schema/teacherSchema';
import Attendance from '../../../schema/attendanceSchema';
import TermDate from '../../../schema/termDateSchema';
import config from "../../../config";

class AdminClassReportController {
    generateReport = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { classId } = req.params;

            const classData = await Class.findOne({
                _id: classId,
                isDeleted: false,
            })
                .select(['_id', 'className', 'classId'])
                .populate([
                    {
                        path: 'courses',
                        model: Course,
                        select: [
                            '_id',
                            'courseName',
                            'courseId',
                            'numberOfTimesPerWeek',
                        ],
                        populate: {
                            path: 'teacher',
                            model: Teacher,
                            select: ['_id'],
                            populate: {
                                path: 'user',
                                model: User,
                                select: ['_id', 'fullname'],
                            },
                        },
                    },
                    {
                        path: 'students',
                        model: Student,
                        select: ['_id', 'studentId', 'studentImage'],
                        populate: [
                            {
                                path: 'user',
                                model: User,
                                select: ['_id', 'fullname', 'nationalID'],
                            },
                            {
                                path: 'parent',
                                model: Parent,
                                select: ['_id', 'phone'],
                            },
                        ],
                    },
                ]);

            const results = await Result.find({
                class: classId,
                isDeleted: false,
            }).select([
                '_id',
                'courseWorkDegree',
                'midTermDegree',
                'finalDegree',
                'class',
                'student',
                'teacher',
            ]);

            // return res.status(200).json({
            //     status: 200,
            //     data: results
            // })

            if (!classData)
                return res.status(404).json({
                    status: 404,
                    message: 'send class id',
                });

            const pdfName = generateRandomString();
            const doc = new PDFDocument();

            // // Draw the table headers
            doc.font('Helvetica-Bold');
            doc.fillColor('red')
                .fontSize(20)
                .text('Class Report', 0, 15, { align: 'center' });

            doc.fontSize(10);
            doc.fillColor('black');

            let rectLength = 50;

            doc.font('Helvetica-Bold')
                .fillColor('green')
                .text('Course Name', 0, 200, { align: 'center' });

            // Set the table positioning and styling
            let startX = 50;
            let startY = 350;
            const rowHeight = 25;
            const colWidth = 150;

            // Set the table headers
            const courseHeaders = [
                'Course ID',
                'Course Name',
                'Teacher Name',
                'Times/Week',
            ];

            // Draw the table headers
            doc.font('Helvetica-Bold');
            doc.fontSize(10);
            doc.fillColor('black');

            for (let i = 0; i < courseHeaders.length; i++) {
                doc.text(courseHeaders[i], startX + i * colWidth, startY);
            }

            // Draw the table data
            doc.font('Helvetica');
            doc.fontSize(10);

            for (let row = 0; row < classData.courses.length; row++) {
                const course = classData.courses[row];
                doc.text(
                    course.courseId as unknown as string,
                    startX,
                    startY + (row + 1) * rowHeight
                );

                doc.text(
                    course.courseName,
                    startX + colWidth,
                    startY + (row + 1) * rowHeight
                );

                doc.text(
                    course.teacher.user.fullname,
                    startX + 1.8 * colWidth,
                    startY + (row + 1) * rowHeight
                );

                doc.text(
                    course.numberOfTimesPerWeek as unknown as string,
                    startX + 3 * colWidth,
                    startY + (row + 1) * rowHeight
                );
            }

            doc.addPage();

            doc.font('Helvetica-Bold')
                .fontSize(18)
                .fillColor('#00f')
                .text('Students', 0, 15, { align: 'center' });
            // Draw the table data
            doc.font('Helvetica');
            doc.fontSize(10);
            for (let i = 0; i < classData.students.length; i++) {
                // Draw the table headers
                startX = 140;
                startY = 80;

                doc.font('Helvetica-Bold');
                doc.fontSize(10);
                doc.fillColor('black');

                for (
                    let rowData = 0;
                    rowData < classData.courses.length;
                    rowData++
                ) {
                    const attendance = await this.getAttendance(
                        classData.students[i]._id,
                        classData.courses[rowData].teacher._id,
                        classData._id
                    );
                    doc.text(
                        classData.courses[rowData].courseName as string,
                        startX + (0 % 2 == 0 ? 35 : 45) + 0 * colWidth,
                        startY + rectLength + (rowData + 1) * rowHeight
                    );

                    results.map((result) => {
                        if (
                            classData.students[i]._id.toString() ==
                                result.student.toString() &&
                            classData.courses[rowData].teacher._id.toString() ==
                                result.teacher.toString() &&
                            classData._id.toString() == result.class.toString()
                        ) {
                            const degree =
                                result.midTermDegree +
                                result.courseWorkDegree +
                                result.finalDegree;
                            doc.text(
                                degree as unknown as string,
                                startX + (1 % 2 == 0 ? 35 : 45) + 1 * colWidth,
                                startY + rectLength + (rowData + 1) * rowHeight
                            );
                            doc.text(
                                `${attendance.attendance} / ${attendance.numberOfLessonsInTerm}`,
                                startX + (2 % 2 == 0 ? 35 : 45) + 2 * colWidth,
                                startY + rectLength + (rowData + 1) * rowHeight
                            );
                        }
                    });
                }

                doc.rect(10, rectLength, 590, 230).stroke('black');
                doc.image(
                    `public/images/studentImage/${classData.students[i].studentImage}`,
                    25,
                    15 + rectLength,
                    { width: 100 }
                );
                doc.fillColor('black').text(
                    `Name: ${classData.students[i].user.fullname}`,
                    140,
                    20 + rectLength
                );

                doc.fillColor('black').text(
                    `nationalID: ${classData.students[i].user.nationalID}`,
                    140,
                    40 + rectLength
                );

                doc.fillColor('#f00')
                    .fontSize(16)
                    .text(`Results`, 140, 60 + rectLength);

                // Define the table headers
                const headers = ['Course Name', 'Degree', 'Attendance'];

                // Draw the table headers
                doc.font('Helvetica-Bold');
                doc.fontSize(10);
                doc.fillColor('black');
                for (let i = 0; i < headers.length; i++) {
                    doc.text(
                        headers[i],
                        startX + (i == 0 ? 15 : 35) + i * colWidth,
                        startY + rectLength
                    );
                }

                // Draw the table data
                doc.font('Helvetica');
                doc.fontSize(10);

                rectLength += 250;

                if (rectLength == 550) {
                    doc.addPage();
                    rectLength = 50;
                }
            }

            doc.pipe(
                fs.createWriteStream(`public/reports/class/${pdfName}.pdf`)
            );
            doc.end();

            res.status(200).json({
                status: 200,
                data: {
                    pdfName: `${config.uploadedFiles}/reports/class/${pdfName}.pdf`,
                },
                message: 'Generate class report successfully',
            });

        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    private getAttendance = async (
        studentId: string,
        teacherId: string,
        classId: string
    ) => {
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

        const numberOfWeeks = await TermDate.find().select(['numberOfWeeks']);

        const numberOfLessonsInTerm =
            numberOfWeeks[0].numberOfWeeks * courseWork!.numberOfTimesPerWeek;

        return {
            attendance: attendance,
            numberOfLessonsInTerm: numberOfLessonsInTerm,
        };
    };
}

export default AdminClassReportController;
