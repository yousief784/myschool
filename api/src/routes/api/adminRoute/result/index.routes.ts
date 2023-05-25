import { Router } from 'express';
import ResultController from '../../../../Controller/adminController/result';

const adminResultRouter: Router = Router();
const resultController = new ResultController();

adminResultRouter.post('/set/degree', resultController.setStudentResult);
adminResultRouter.get('/get/attendance', resultController.getStudentAttendance);
adminResultRouter.get('/:classId', resultController.getStudentsInClass);
adminResultRouter.get('/get-student/result', resultController.getStudentResult);
adminResultRouter.post('/hide', resultController.hideResult)
adminResultRouter.post('/show', resultController.showResult)

export default adminResultRouter;
