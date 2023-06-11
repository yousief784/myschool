import { Router } from 'express';
import AdminTeacherReportController from '../../../../../Controller/adminController/report/teacher';

const adminTeacherReportRouter: Router = Router();
const adminTeacherReportController = new AdminTeacherReportController();

adminTeacherReportRouter.get(
    '/generate-pdf',
    adminTeacherReportController.generateReport
);

export default adminTeacherReportRouter;
