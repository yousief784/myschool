import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../app';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import generateRandomString from '../../../utils/generateRandomString';
import Teacher from '../../../schema/teacherSchema';
import config from '../../../config';

class AdminTeacherReportController {
    generateReport = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const pdfName = generateRandomString();
            const teachers = await Teacher.find({
                isDeleted: false,
            })
                .select(['_id', 'numberOfLessons'])
                .populate([
                    {
                        path: 'courses',
                        model: 'Course',
                        select: ['_id', 'courseName', 'numberOfTimesPerWeek'],
                        populate: {
                            path: 'classId',
                            model: 'Class',
                            select: ['_id', 'className'],
                        },
                    },
                    {
                        path: 'user',
                        model: 'User',
                        select: ['_id', 'fullname', 'nationalID'],
                    },
                ]);

            const doc = new PDFDocument();
            let rectLength = 50;
            doc.text('Teacher Report', 250, 20);
            teachers.map((teacher: any, index: number) => {
                doc.rect(10, rectLength, 590, 150).stroke('black');
                doc.image(
                    'public/images/studentImage/student.jpg',
                    25,
                    15 + rectLength,
                    { width: 100 }
                );
                doc.text(
                    `Name: ${teacher.user.fullname}`,
                    140,
                    20 + rectLength
                );
                let y = 60;

                teacher.courses.map((item: any) => {
                    const courseName = item.courseName;
                    doc.text(
                        `${courseName} ====> ${item.classId.className} ==> ${item.numberOfTimesPerWeek} lesson per week`,
                        140,
                        y + rectLength
                    );
                    y += 20;
                });
                doc.text(
                    `National id: ${teacher.user.nationalID}`,
                    140,
                    y + rectLength
                );

                rectLength += 160;

                if (index % 3 == 0 && index != 0) {
                    doc.addPage();
                    rectLength = 10;
                    y = 50;
                }
            });

            doc.pipe(
                fs.createWriteStream(`public/reports/teacher/${pdfName}.pdf`)
            );
            doc.end();
            res.status(200).json({
                status: 200,
                data: {
                    pdfName: `${config.uploadedFiles}/reports/teacher/${pdfName}.pdf`,
                },
                message: 'generate teacher report successfully',
            });
        } catch (error: any) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default AdminTeacherReportController;
