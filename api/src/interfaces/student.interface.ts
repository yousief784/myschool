import { ParentInterface } from './parent.interface';
import { UserInterface } from './user.interface';
import { ClassInterface } from './class.interface';

export interface StudentInterface {
    _id: string;
    class: ClassInterface;
    user: UserInterface;
    parent: ParentInterface;
    studentId: number;
    isDeleted: boolean;
}
