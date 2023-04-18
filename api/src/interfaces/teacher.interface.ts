import { UserInterface } from './user.interface';

export interface TeacherInterface {
    _id: string;
    user: UserInterface;
    isDeleted: boolean;
}
