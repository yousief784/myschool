import mongoose, { Schema } from 'mongoose';
import { ClassInterface } from '../interfaces/class.interface';

const classSchema = new Schema<ClassInterface>(
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

const Class = mongoose.model<ClassInterface>('Class', classSchema);
export default Class;
