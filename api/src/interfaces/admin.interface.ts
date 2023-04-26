import { IUser } from './user.interface';

export interface IAdmin {
    _id: string;
    user: IUser;
    isDeleted: boolean;
}
