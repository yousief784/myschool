import { IClass } from './class.interface';
import { IStudent } from './student.interface';
import { ITeacher } from './teacher.interface';

export interface IResult {
    _id: string;
    student: IStudent;
    teacher: ITeacher;
    class: IClass;
    courseWorkDegree: number;
    midTermDegree: number;
    finalDegree: number;
    showResult: boolean;
    isDeleted: boolean;
}
