import mongoose, { Schema } from 'mongoose';
import { NextFunction } from 'express';
import { CourseInterface } from '../interfaces/course.interface';

const courseSchema = new Schema<CourseInterface>(
    {
        courseName: {
            type: String,
            match: /^[a-zA-Z ]+$/,
            required: [true, 'Class name is required'],
            min: [2, 'Minumium charcter for course name is 2 char'],
            max: [50, 'Maxmium character for course name is 50 char'],
        },
        courseId: {
            type: Number,
            unique: true,
        },
        classId: {
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

courseSchema.pre('save', function (next) {
    const doc = this;
    if (!doc.isNew) {
        return next();
    }
    // Find the highest userId in the collection and increment by 1
    Course.findOne({}, {}, { sort: { courseId: -1 } }, (err, user) => {
        if (err) {
            return next(err);
        }
        doc.courseId = user ? user.courseId + 1 : 1;
        next();
    });
});

const Course = mongoose.model<CourseInterface>('Course', courseSchema);
export default Course;
