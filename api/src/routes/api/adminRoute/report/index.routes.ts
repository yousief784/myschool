import { Router } from 'express';
import adminTeacherReportRouter from './teacher/index.routes';
import adminClassReportRouter from './class/index.routes';

const adminReportRouter: Router = Router();

adminReportRouter.use('/teacher', adminTeacherReportRouter);
adminReportRouter.use('/class', adminClassReportRouter);

export default adminReportRouter;
