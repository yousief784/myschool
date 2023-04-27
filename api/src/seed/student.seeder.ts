import database from '../database';
import Class from '../schema/classSchema';
import Parent from '../schema/parentSchema';
import Student from '../schema/studentSchema';
import User from '../schema/userSchema';
import Chance from 'chance';

const createStudent = async () => {
    database.connect();
    let done = 0;
    const exit = () =>
        database.disconnect().then(() => {
            console.log('Database disconnect');
        });
    const classes = await Class.find({ isDeleted: false });

    for (let i = 0; i < 50; i++) {
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
            .then((user: any) => {
                user.setPassword(
                    String(studentData.nationalID),
                    (error: any, user: any) => {
                        if (error) {
                            console.log(error);
                        } else {
                            return user
                                .save()
                                .then((savedUser: any) => {
                                    return savedUser;
                                })
                                .catch((error: any) => {
                                    console.log(error);
                                });
                        }
                    }
                );
                return user;
            })
            .then(async (user) => {
                return await Student.create({
                    user: user._id,
                    class: classes[Math.floor(Math.random() * classes.length)]
                        ._id,
                });
            });

        const parent = await User.create(parentData)
            .then((user: any) => {
                user.setPassword(
                    String(parentData.nationalID),
                    (error: any, user: any) => {
                        if (error) {
                            console.log(error);
                        } else {
                            return user
                                .save()
                                .then((savedUser: any) => {
                                    return savedUser;
                                })
                                .catch((error: any) => {
                                    console.log(error);
                                });
                        }
                    }
                );
                return user;
            })
            .then(async (user: any) => {
                const parent = await Parent.create({
                    parentPhone: parentData.parentPhone,
                    user: user._id,
                }).then(async (parent: any) => {
                    await Parent.findOneAndUpdate(
                        { _id: parent._id },
                        { $push: { students: student._id } }
                    );
                    return parent;
                });
                return parent;
            });

        await Student.findOneAndUpdate(
            { _id: student._id },
            { parent: parent._id }
        ).then(() => {
            done++;
            if (done == 50) {
                exit();
            }
        });
    }
};

createStudent();
