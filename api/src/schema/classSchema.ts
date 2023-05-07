import mongoose, { Schema } from 'mongoose';
import { IClass } from '../interfaces/class.interface';

const classSchema = new Schema<IClass>(
    {
        className: {
            type: String,
            match: /^[a-zA-Z ]+$/,
            required: [true, 'Class name is required'],
            min: [2, 'Minumium charcter for class name is 2 char'],
            max: [50, 'Maxmium character for class name is 50 char'],
        },
        classId: {
            type: Number,
            unique: true,
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Student',
            },
        ],
        courses: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Course',
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

classSchema.pre('save', function (next) {
    const doc = this;
    if (!doc.isNew) {
        return next();
    }
    // Find the highest userId in the collection and increment by 1
    Class.findOne({}, {}, { sort: { classId: -1 } }, (err, user) => {
        if (err) {
            return next(err);
        }
        doc.classId = user ? user.classId + 1 : 1;
        next();
    });
});

const Class = mongoose.model<IClass>('Class', classSchema);
export default Class;
