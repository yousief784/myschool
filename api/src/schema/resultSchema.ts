import mongoose, { Schema } from 'mongoose';
import { IResult } from '../interfaces/result.interface';

const resultSchema = new Schema<IResult>(
    {
        courseWorkDegree: {
            type: Number,
            min: 0,
            required: true,
        },
        midTermDegree: {
            type: Number,
            min: 0,
        },
        finalDegree: {
            type: Number,
        },
        showResult: {
            type: Boolean,
            default: false,
        },
        student: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Student',
        },
        teacher: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Teacher',
        },
        class: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Class',
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

const Result = mongoose.model<IResult>('Result', resultSchema);

export default Result;
