import { Router } from 'express';
import StudentController from '../../../Controller/studentController';

const studentRouter: Router = Router();
const studentController = new StudentController();

studentRouter.get('/course/:classId', studentController.getCoursesForThisClass);
studentRouter.get('/schedule/:classId', studentController.getSchedule);
studentRouter.get('/data/:userId', studentController.getStudetData);
studentRouter.get('/result/:studentId', studentController.getResult);

export default studentRouter;
