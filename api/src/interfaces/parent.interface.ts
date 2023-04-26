import { IStudent } from './student.interface';
import { IUser } from './user.interface';

export interface IParent {
    _id: string;
    user: IUser;
    parentPhone: string;
    students: IStudent[];
    isDeleted: boolean;
}
