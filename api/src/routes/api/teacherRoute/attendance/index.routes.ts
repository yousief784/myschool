import { Router } from 'express';
import AttendanceController from '../../../../Controller/teacherController/attendance';

const attendanceRouter: Router = Router();
const attendanceController = new AttendanceController();

attendanceRouter.get('/', attendanceController.index);
attendanceRouter.get('/get', attendanceController.getStudentsInThisClass);
attendanceRouter.post('/class/:classId', attendanceController.create);
attendanceRouter.get(
    '/student/:studentId',
    attendanceController.getStudentAttendance
);
attendanceRouter.post(
    '/student/:attendId',
    attendanceController.setStudentAttendanceToday
);

export default attendanceRouter;
