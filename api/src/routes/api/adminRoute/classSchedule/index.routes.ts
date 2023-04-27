import { Router } from 'express';
import ClassScheduleController from '../../../../Controller/adminController/classSchedule';

const adminClassScheduleRouter: Router = Router();
const classScheduleController = new ClassScheduleController();

adminClassScheduleRouter.post('/:classId', classScheduleController.create);

export default adminClassScheduleRouter;
