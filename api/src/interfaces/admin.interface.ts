import { UserInterface } from './user.interface';

export interface AdimnInterface {
    _id: string;
    user: UserInterface;
    isDeleted: boolean;
}
