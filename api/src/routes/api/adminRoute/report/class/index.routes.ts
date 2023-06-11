import { Router } from 'express';
import AdminClassReportController from '../../../../../Controller/adminController/report/class';

const adminClassReportRouter: Router = Router();
const adminClassReportController = new AdminClassReportController();

adminClassReportRouter.get(
    '/generate-pdf/:classId',
    adminClassReportController.generateReport
);

export default adminClassReportRouter;
