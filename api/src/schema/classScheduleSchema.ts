import mongoose, { Schema } from 'mongoose';
import { IClassSchedule } from '../interfaces/classSchedule.interface';

const classScheduleSchema = new Schema<IClassSchedule>({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    dayOfWeek: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
});

const ClassSchedule = mongoose.model<IClassSchedule>(
    'ClassSchedule',
    classScheduleSchema
);

export default ClassSchedule;
