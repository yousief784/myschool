import mongoose, { Schema } from 'mongoose';
import { AdimnInterface } from '../interfaces/admin.interface';

const adminSchema = new Schema<AdimnInterface>(
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

const Admin = mongoose.model<AdimnInterface>('Admin', adminSchema);

export default Admin;
