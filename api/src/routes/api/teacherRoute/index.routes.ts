import { Router } from 'express';
import teacherScheduleRouter from './teacherSchedule/index.routes';
import TeacherController from '../../../Controller/teacherController';
import attendanceRouter from './attendance/index.routes';
import teacherStudentRouter from './teacherStudent/index.routes';

const teacherRouter: Router = Router();
const teacherController = new TeacherController();

teacherRouter.get('/data/:userId', teacherController.getTeacherData);
teacherRouter.use('/schedule', teacherScheduleRouter);
teacherRouter.use('/attendance', attendanceRouter);
teacherRouter.use('/student', teacherStudentRouter);

export default teacherRouter;
