import mongoose, { Schema } from 'mongoose';
import { IStudent } from '../interfaces/student.interface';

const studentSchema = new Schema<IStudent>(
    {
        class: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Class',
        },
        studentId: {
            type: Number,
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        parent: {
            type: Schema.Types.ObjectId,
            requied: true,
            ref: 'Parent',
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

studentSchema.pre('save', function (next) {
    const doc: any = this;
    if (!doc.isNew) {
        return next();
    }
    // Find the highest userId in the collection and increment by 1
    Student.findOne({}, {}, { sort: { studentId: -1 } }, (err, student) => {
        if (err) {
            return next(err);
        }
        doc.studentId = student ? student.studentId + 1 : 1;
        next();
    });
});

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;
