import { ICourse } from './course.interface';
import { ITeacher } from './teacher.interface';

export interface ITeacherSchedule {
    teacherId: ITeacher;
    courseId: ICourse;
    dayOfWeek: string;
    startTime: Date;
    endTime: Date;
}
