import { Router } from 'express';
import TeacherScheduleController from '../../../../Controller/adminController/teacherSchedules';

const adminTeacherScheduleRouter: Router = Router();
const teacherScheduleController = new TeacherScheduleController();

// adminClassRouter.get('/', scheduleController.index);
adminTeacherScheduleRouter.get('/', teacherScheduleController.create);

export default adminTeacherScheduleRouter;
