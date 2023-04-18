import mongoose, { Schema } from 'mongoose';
import { TeacherInterface } from '../interfaces/teacher.interface';

const teacherSchema = new Schema<TeacherInterface>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

const Teacher = mongoose.model<TeacherInterface>('Teacher', teacherSchema);

export default Teacher;
