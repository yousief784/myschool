import database from '../database';
import Class from '../schema/classSchema';
import Parent from '../schema/parentSchema';
import Student from '../schema/studentSchema';
import User from '../schema/userSchema';
import Chance from 'chance';

const createStudent = async () => {
    console.log('Student');

    database.connect();
    let done = 0;
    const exit = () =>
        database.disconnect().then(() => {
            console.log('Database disconnect');
        });
    const classes = await Class.find({ isDeleted: false });

    for (let i = 0; i < 20; i++) {
        const studentChance = new Chance();
        const parentChance = new Chance();
        const studentFirstName = studentChance.first();
        const studentMiddleAndLasName = studentChance.name({
            middle: true,
        });
        const studentData = {
            fullname: `${studentFirstName} ${studentMiddleAndLasName}`,
            nationalID: studentChance.integer({
                min: 10000000000000,
                max: 99999999999999,
            }),
        };

        const parentData = {
            parentName: studentMiddleAndLasName,
            nationalID: parentChance.integer({
                min: 10000000000000,
                max: 99999999999999,
            }),
            parentPhone: '01067762979',
        };

        const student = await User.create(studentData)
            .then(async (user: any) => {
                await user.setPassword(
                    String(studentData.nationalID),
                    async (error: any, user: any) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(studentData.nationalID);

                            return await user
                                .save()
                                .then(async (savedUser: any) => {
                                    return await savedUser;
                                })
                                .catch((error: any) => {
                                    console.log(error);
                                });
                        }
                    }
                );
                return await user;
            })
            .then(async (user) => {
                const createStudent = await Student.create({
                    user: user._id,
                    class: classes[Math.floor(Math.random() * classes.length)]
                        ._id,
                });

                return createStudent;
            });

        const parent = await User.create(parentData)
            .then(async (user: any) => {
                await user.setPassword(
                    String(parentData.nationalID),
                    async (error: any, user: any) => {
                        if (error) {
                            console.log(error);
                        } else {
                            return await user
                                .save()
                                .then(async (savedUser: any) => {
                                    return await savedUser;
                                })
                                .catch((error: any) => {
                                    console.log(error);
                                });
                        }
                    }
                );
                return await user;
            })
            .then(async (user: any) => {
                const parent = await Parent.create({
                    parentPhone: parentData.parentPhone,
                    user: user._id,
                }).then(async (parent: any) => {
                    const updateParent = await Parent.findOneAndUpdate(
                        { _id: parent._id },
                        { $push: { students: student._id } },
                        { new: true }
                    );
                    return await updateParent;
                });
                return await parent;
            });

        const updateStudent = await Student.findOneAndUpdate(
            { _id: student._id },
            { parent: Object.assign(parent as object)._id },
            { new: true }
        );
        done++;
        console.log('done: ', done);

        if (done == 20) {
            console.log('hhhh i am inside', done);

            exit();
            break;
        }
    }
};

createStudent();
