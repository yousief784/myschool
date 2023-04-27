import { Router } from 'express';
import TeacherScheduleController from '../../../../Controller/teacherController/teacherSchedule';

const teacherScheduleRouter: Router = Router();
const teacherScheduleController = new TeacherScheduleController();

teacherScheduleRouter.get('/:teacherId', teacherScheduleController.index);

export default teacherScheduleRouter;
