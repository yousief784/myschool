import mongoose, { Schema } from 'mongoose';
import { ITeacherSchedule } from '../interfaces/teacherSchedule.interface';

const teacherScheduleSchema = new Schema<ITeacherSchedule>({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    courseId: {
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
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
});

const TeacherSchedule = mongoose.model<ITeacherSchedule>(
    'TeacherSchedule',
    teacherScheduleSchema
);

export default TeacherSchedule;
