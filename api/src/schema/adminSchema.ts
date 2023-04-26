import mongoose, { Schema } from 'mongoose';
import { IAdmin } from '../interfaces/admin.interface';

const adminSchema = new Schema<IAdmin>(
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

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
