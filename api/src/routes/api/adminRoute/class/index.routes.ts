import { Router } from 'express';
import ClassController from '../../../../Controller/adminController/class';

const adminClassRouter: Router = Router();
const classController = new ClassController();

adminClassRouter.get('/', classController.index);
adminClassRouter.post('/create', classController.create);

export default adminClassRouter;
