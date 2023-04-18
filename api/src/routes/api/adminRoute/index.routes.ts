import { Router } from 'express';
import adminStudentRouter from './student/index.routes';
import adminTeacherRouter from './teacher/index.routes';
import adminClassRouter from './class/index.routes';
import adminCourseRouter from './course/index.routes';

const adminRouter: Router = Router();

adminRouter.use('/student', adminStudentRouter);
adminRouter.use('/teacher', adminTeacherRouter);
adminRouter.use('/class', adminClassRouter);
adminRouter.use('/course', adminCourseRouter);

export default adminRouter;
