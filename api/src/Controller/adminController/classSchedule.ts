import { Request, Response, NextFunction } from 'express';
import { logger } from '../../app';
import Course from '../../schema/courseSchema';
import ClassSchedule from '../../schema/classScheduleSchema';
import Attendance from '../../schema/attendanceSchema';

class ClassScheduleController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { classId } = req.params;
            if (!classId)
                return res
                    .status(400)
                    .json({ status: 400, message: 'Send classId' });

            await ClassSchedule.deleteMany({ classId: classId });
            await Attendance.deleteMany({ classId: classId });

            const coursesInThisClass = await Course.find({
                classId: classId,
            });

            const schedules = [];

            const daysOfWeek = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                // 'Friday',
                // 'Saturday',
            ];
            const startHour = 7; // 8AM
            const endHour = 13; // 2PM
            let countNumberOfLessons = 0;
            let assignedTimes = new Set();

            for (const course of coursesInThisClass) {
                for (let i = 0; i < course.numberOfTimesPerWeek; i++) {
                    countNumberOfLessons += 1;
                    let dayOfWeek,
                        startTime,
                        endTime,
                        startTimeString,
                        endTimeString;
                    let conflict = true;
                    while (conflict) {
                        dayOfWeek =
                            daysOfWeek[
                                Math.floor(Math.random() * daysOfWeek.length)
                            ];
                        startTime = new Date();
                        startTime.setHours(
                            startHour +
                                Math.floor(
                                    Math.random() * (endHour - startHour)
                                )
                        );
                        startTime.setMinutes(0);
                        startTime.setSeconds(0);
                        startTime.setMilliseconds(0);
                        endTime = new Date(
                            startTime.getTime() + 60 * 60 * 1000
                        );
                        const startHours = String(
                            startTime.getHours() + 1
                        ).padStart(2, '0');
                        const startMinutes = String(
                            startTime.getMinutes()
                        ).padStart(2, '0');
                        const startSeconds = String(
                            startTime.getSeconds()
                        ).padStart(2, '0');

                        const endHours = String(
                            endTime.getHours() + 1
                        ).padStart(2, '0');
                        const endMinutes = String(
                            endTime.getMinutes()
                        ).padStart(2, '0');
                        const endSeconds = String(
                            endTime.getSeconds()
                        ).padStart(2, '0');
                        startTimeString = `${startHours}:${startMinutes}:${startSeconds}`;
                        endTimeString = `${endHours}:${endMinutes}:${endSeconds}`;
                        const timeSlot =
                            dayOfWeek +
                            startTime.toString() +
                            endTime.toString();
                        if (!assignedTimes.has(timeSlot)) {
                            conflict = false;
                            assignedTimes.add(timeSlot);
                        }
                    }

                    const checkIsTeacherHaveLessonInSameTime =
                        await ClassSchedule.findOne({
                            teacher: course.teacher,
                            dayOfWeek: dayOfWeek,
                            startTime: startTimeString,
                        }).count();

                    if (checkIsTeacherHaveLessonInSameTime) {
                        continue;
                    }

                    const schedule = new ClassSchedule({
                        classId: course.classId,
                        course: course._id,
                        teacher: course.teacher,
                        dayOfWeek: dayOfWeek,
                        startTime: startTimeString,
                        endTime: endTimeString,
                    });
                    schedules.push(schedule);

                    if (countNumberOfLessons > 30) {
                        return res.status(400).json({
                            status: 400,
                            message:
                                'Number of  lessons is more than 30 per week',
                        });
                    }
                }
            }
            const createdSchedules = await ClassSchedule.insertMany(schedules);

            res.status(200).json({
                status: 200,
                data: createdSchedules,
                message: 'set schedule successfully',
            });
        } catch (err) {
            logger.error('An error occurred', { error: err });
            return next(err);
        }
    };
}

export default ClassScheduleController;
