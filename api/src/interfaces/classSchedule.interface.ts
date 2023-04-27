import { IClass } from './class.interface';
import { ICourse } from './course.interface';
import { ITeacher } from './teacher.interface';

export interface IClassSchedule {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    teacher: ITeacher;
    classId: IClass;
    course: ICourse;
}
