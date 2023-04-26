import { Router } from 'express';
import adminStudentRouter from './student/index.routes';
import adminTeacherRouter from './teacher/index.routes';
import adminClassRouter from './class/index.routes';
import adminCourseRouter from './course/index.routes';
import adminTeacherScheduleRouter from './teacherSchedule/index.routes';
import adminClassScheduleRouter from './classSchedule/index.routes';

const adminRouter: Router = Router();

adminRouter.use('/student', adminStudentRouter);
adminRouter.use('/teacher', adminTeacherRouter);
adminRouter.use('/class', adminClassRouter);
adminRouter.use('/course', adminCourseRouter);
adminRouter.use('/classSchedule', adminClassScheduleRouter);
adminRouter.use('/teacherSchedule', adminTeacherScheduleRouter);

export default adminRouter;
