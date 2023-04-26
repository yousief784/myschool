import { Router } from 'express';
import ParentController from '../../../Controller/parentController';

const parentRouter: Router = Router();
const parentController = new ParentController();

parentRouter.get('/', parentController.getChildren);

export default parentRouter;
