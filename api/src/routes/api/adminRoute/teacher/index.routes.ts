import { Router } from 'express';
import AdminTeacherController from '../../../../Controller/adminController/teacher';

const adminTeacherRouter: Router = Router();
const adminTeacherController = new AdminTeacherController();

adminTeacherRouter.get('/', adminTeacherController.index);
adminTeacherRouter.post('/', adminTeacherController.create);

export default adminTeacherRouter;
