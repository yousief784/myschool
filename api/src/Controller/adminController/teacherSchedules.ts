import { Request, Response, NextFunction } from 'express';
import { logger } from '../../app';
import Teacher from '../../schema/teacherSchema';
import Schedule from '../../schema/teacherScheduleSchema';

class TeacherScheduleController {
    create = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('hs');

            const teachers = await Teacher.find();
            const schedules = [];

            const daysOfWeek = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
            ];
            const startHour = 8; // 8AM
            const endHour = 14; // 2PM

            for (const teacher of teachers) {
                for (const courseId of teacher.courses) {
                    const dayOfWeek =
                        daysOfWeek[
                            Math.floor(Math.random() * daysOfWeek.length)
                        ];
                    const startTime = new Date();
                    startTime.setHours(
                        startHour +
                            Math.floor(Math.random() * (endHour - startHour))
                    );
                    startTime.setMinutes(Math.random() < 0.5 ? 0 : 30);
                    const endTime = new Date(
                        startTime.getTime() + 60 * 60 * 1000
                    );

                    const schedule = new Schedule({
                        teacherId: teacher._id,
                        courseId: courseId,
                        dayOfWeek: dayOfWeek,
                        startTime: startTime,
                        endTime: endTime,
                    });
                    schedules.push(schedule);
                }
            }

            const createdSchedules = await Schedule.insertMany(schedules);

            const formattedSchedules = schedules.map((schedule) => {
                const startTime = new Date(schedule.startTime)
                    .toISOString()
                    .replace('T', ' ')
                    .replace('Z', '');
                const endTime = new Date(schedule.endTime)
                    .toISOString()
                    .replace('T', ' ')
                    .replace('Z', '');
                return {
                    courseId: schedule.courseId._id,
                    dayOfWeek: schedule.dayOfWeek,
                    startTime,
                    endTime,
                };
            });
            res.status(200).json({
                status: 200,
                data: formattedSchedules,
                message: 'return schedule successfully',
            });
        } catch (err) {
            logger.error('An error occurred', { error: err });
            return next(err);
        }
    };
}

export default TeacherScheduleController;
