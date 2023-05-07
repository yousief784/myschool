import mongoose, { Schema } from 'mongoose';
import { IAttendance } from '../interfaces/attendance.interface';

const attendanceSchema = new Schema<IAttendance>(
    {
        student: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Student',
        },
        classSchedule: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'ClassSchedule',
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
        attendance: {
            type: String,
            // required: true,
            default: null,
        },
        date: {
            type: Date,
            requried: true,
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

const Attendance = mongoose.model<IAttendance>('Attendance', attendanceSchema);

export default Attendance;
