import { Router } from 'express';
import teacherScheduleRouter from './teacherSchedule/index.routes';
import TeacherController from '../../../Controller/teacherController';

const teacherRouter: Router = Router();
const teacherController = new TeacherController();

teacherRouter.get('/data/:userId', teacherController.getTeacherData);
teacherRouter.use('/schedule', teacherScheduleRouter);

export default teacherRouter;
