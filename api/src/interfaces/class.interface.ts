import { CourseInterface } from './course.interface';
import { StudentInterface } from './student.interface';

export interface ClassInterface {
    _id: string;
    className: string;
    classId: number;
    students: StudentInterface[];
    courses: CourseInterface[];
    isDeleted: boolean;
}
