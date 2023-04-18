import { StudentInterface } from './student.interface';
import { UserInterface } from './user.interface';

export interface ParentInterface {
    _id: string;
    user: UserInterface;
    parentPhone: string;
    students: StudentInterface[];
    isDeleted: boolean;
}
