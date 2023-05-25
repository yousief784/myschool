import { Router } from 'express';
import CourseController from '../../../../Controller/adminController/course';

const adminCourseRouter: Router = Router();
const courseController = new CourseController();

adminCourseRouter.get('/', courseController.index);
adminCourseRouter.get('/:courseId', courseController.show);
adminCourseRouter.post('/create', courseController.create);

export default adminCourseRouter;
