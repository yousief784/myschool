import { Router } from 'express';
import TermDateController from '../../../../Controller/adminController/termDate';

const adminTermDateRouter: Router = Router();
const termDateController = new TermDateController();

adminTermDateRouter.post('/', termDateController.create);

export default adminTermDateRouter;
