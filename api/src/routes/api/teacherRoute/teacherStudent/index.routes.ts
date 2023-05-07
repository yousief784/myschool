import { Router } from 'express';
import TeacherStudentController from '../../../../Controller/teacherController/teacherStudent';

const teacherStudentRouter: Router = Router();
const teacherStudentController = new TeacherStudentController();

teacherStudentRouter.get(
    '/data/:studentId',
    teacherStudentController.showStudentData
);

export default teacherStudentRouter;
