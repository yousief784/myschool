import mongoose, { Schema } from 'mongoose';
import { ITeacher } from '../interfaces/teacher.interface';

const teacherSchema = new Schema<ITeacher>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            },
        ],
        numberOfLessons: {
            type: Number,
            min: 0,
            max: [20, 'Number of lessons teacher take is 20 lesson'],
            required: true,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);

export default Teacher;
