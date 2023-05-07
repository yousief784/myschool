import { Router } from 'express';
import ResultController from '../../../../Controller/adminController/result';

const adminResultRouter: Router = Router();
const resultController = new ResultController();

adminResultRouter.get('/', resultController.getStudentsAttendance);

export default adminResultRouter;
