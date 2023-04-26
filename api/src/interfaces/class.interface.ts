import { ICourse } from './course.interface';
import { IStudent } from './student.interface';

export interface IClass {
    _id: string;
    className: string;
    classId: number;
    students: IStudent[];
    courses: ICourse[];
    isDeleted: boolean;
}
