import { ICourse } from './course.interface';
import { IUser } from './user.interface';

export interface ITeacher {
    _id: string;
    user: IUser;
    courses: ICourse[];
    isDeleted: boolean;
}
