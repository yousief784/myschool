import { Router } from 'express';
import userRouter from './api/userRoute/index.routes';
import authMiddleware from '../middlewares/auth.middleware';
import adminMiddleware from '../middlewares/admin.middleware';
import teacherMiddleware from '../middlewares/teacher.middleware';
import parentMiddleware from '../middlewares/parent.middleware';
import studentMiddleware from '../middlewares/student.middleware';
import adminRouter from './api/adminRoute/index.routes';
import teacherRouter from './api/teacherRoute/index.routes';
import parentRouter from './api/parentRoute/index.routes';
import studentRouter from './api/studentRoute/index.routes';
import GeneralController from '../Controller/generalController';

const router: Router = Router();
const generalController = new GeneralController();

router.get('/term-date', generalController.getTermDate);
router.use('/users', userRouter);
router.use(authMiddleware);
router.use('/admin', adminMiddleware, adminRouter);
router.use('/teacher', teacherMiddleware, teacherRouter);
router.use('/parent', parentMiddleware, parentRouter);
router.use('/student', studentMiddleware, studentRouter);

export default router;
