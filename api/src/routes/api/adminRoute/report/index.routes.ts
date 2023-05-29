import { Router } from 'express';
import adminTeacherReportRouter from "./teacher/index.routes";

const adminReportRouter: Router = Router();

adminReportRouter.use('/teacher', adminTeacherReportRouter);

export default adminReportRouter;
