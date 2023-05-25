import { IParent } from './parent.interface';
import { IUser } from './user.interface';
import { IClass } from './class.interface';

export interface IStudent {
    _id: string;
    class: IClass;
    user: IUser;
    parent: IParent;
    studentId: number;
    studentImage: string;
    isDeleted: boolean;
}
