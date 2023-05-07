import { IClass } from './class.interface';
import { IClassSchedule } from './classSchedule.interface';
import { IStudent } from './student.interface';
import { ITeacher } from './teacher.interface';

export interface IAttendance {
    _id: string;
    student: IStudent;
    classSchedule: IClassSchedule;
    teacher: ITeacher;
    class: IClass;
    date: Date;
    attendance: string | null;
    isDeleted: boolean;
}
