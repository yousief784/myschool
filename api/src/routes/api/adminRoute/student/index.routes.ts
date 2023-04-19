import { Router } from 'express';
import AdminStudentController from '../../../../Controller/adminController/student';

const adminStudentRouter: Router = Router();
const adminStudentController = new AdminStudentController();

adminStudentRouter.get('/:classId', adminStudentController.index);
adminStudentRouter.get('/show/:studentId', adminStudentController.show);
adminStudentRouter.post('/add-student', adminStudentController.addStudent);
adminStudentRouter.delete('/:userId', adminStudentController.delete);

export default adminStudentRouter;
