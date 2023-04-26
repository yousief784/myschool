import mongoose, { Schema } from 'mongoose';
import { ITermDate } from '../interfaces/termDate.interface';

const termDateScheduleSchema = new Schema<ITermDate>({
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
});

const TermDate = mongoose.model<ITermDate>('TermDate', termDateScheduleSchema);

export default TermDate;
