import { Router } from 'express';
import AdminStudentController from '../../../../Controller/adminController/student';
import multer from 'multer';
import generateRandomString from '../../../../utils/generateRandomString';

const adminStudentRouter: Router = Router();
const adminStudentController = new AdminStudentController();

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, `${process.cwd()}/public/images/studentImage/`);
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${generateRandomString()}.${file.originalname.split('.')[1]}`
        );
    },
});
const uploadUserAvatar = multer({ storage: storage }).single('studentImage');

adminStudentRouter.get('/:classId', adminStudentController.index);
adminStudentRouter.get('/show/:studentId', adminStudentController.show);
adminStudentRouter.post(
    '/add-student',
    uploadUserAvatar,
    adminStudentController.addStudent
);
adminStudentRouter.delete('/:userId', adminStudentController.delete);

export default adminStudentRouter;
