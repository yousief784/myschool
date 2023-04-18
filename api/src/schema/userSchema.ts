import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { UserInterface } from '../interfaces/user.interface';

const userSchema: any = new Schema<UserInterface>(
    {
        fullname: {
            type: String,
            min: [2, 'minumium charcter for full name is 2 char'],
            max: [50, 'Maxmium character for full name is 50 char'],
            // required: [true, 'Full name is required'],
            validate: {
                validator: function (value: string) {
                    // Define the regular expression pattern with 4 spaces
                    const pattern =
                        /^[A-Za-z]+\s+[A-Za-z]+\s+[A-Za-z]+\s+[A-Za-z]+$/;
                    return pattern.test(value);
                },
                message: 'Invalid fullname write a valid fullname',
            },
        },
        parentName: {
            type: String,
            required: false,
        },
        nationalID: {
            type: String,
            required: [true, 'national id is required'],
            minlength: [14, 'National ID must be 14 number'],
            maxlength: [14, 'National ID must be 14 number'],
        },
        // resetPasswordToken: {
        //     type: String,
        //     required: false,
        //     default: null,
        // },
        // emailVerificationCode: {
        //     type: String,
        //     required: false,
        //     default: null,
        // },
        // emailVerifiedAt: {
        //     type: Date,
        //     required: false,
        //     default: null,
        // },
        authToken: {
            type: String,
            required: false,
            default: null,
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'nationalID',
});

const User = mongoose.model<UserInterface>('User', userSchema);

export default User;
