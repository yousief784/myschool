import { ClassInterface } from './class.interface';

export interface CourseInterface {
    _id: string;
    courseName: string;
    courseId: number;
    classId: ClassInterface;
    isDeleted: boolean;
}
