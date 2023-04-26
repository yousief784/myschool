import { IClass } from './class.interface';
import { ICourse } from './course.interface';

export interface IClassSchedule {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    classId: IClass;
    course: ICourse;
}
