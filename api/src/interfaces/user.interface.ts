export interface UserInterface extends Document {
    _id: string;
    fullname: string;
    parentName: string;
    nationalID: string;
    password: string;
    resetPasswordToken: string | null;
    role: USER_ROLE;
    emailVerificationCode: string | null;
    emailVerifiedAt: string | null;
    authToken: string | null;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}

export enum USER_ROLE {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student',
    PARENT = 'parent',
}
