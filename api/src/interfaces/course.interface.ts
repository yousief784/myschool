import { IClass } from './class.interface';
import { ITeacher } from './teacher.interface';

export interface ICourse {
    _id: string;
    courseName: string;
    courseId: number;
    numberOfTimesPerWeek: number;
    courseWorkDegree: number;
    midTermDegree: number;
    finalDegree: number;
    classId: IClass;
    teacher: ITeacher;
    isDeleted: boolean;
}
