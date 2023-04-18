import mongoose, { Schema } from 'mongoose';
import { ParentInterface } from '../interfaces/parent.interface';

const adminSchema = new Schema<ParentInterface>(
    {
        parentPhone: {
            type: String,
            required: true,
            minlength: [11, 'phone number must be 11 number'],
            maxlength: [11, 'phone number must be 11 number'],
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Student',
            },
        ],
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

const Parent = mongoose.model<ParentInterface>('Parent', adminSchema);

export default Parent;
