import Chance from 'chance';
import database from '../database';
import User from '../schema/userSchema';
import Teacher from '../schema/teacherSchema';

const classes = async () => {
    console.log('teacher');
    database.connect();
    let done = 0;

    const exit = () =>
        database.disconnect().then(() => {
            console.log('Database disconnect');
        });

    for (let i = 0; i < 9; i++) {
        const teacherChance = new Chance();
        const teacherData = {
            fullname: `${teacherChance.first()} ${teacherChance.name({
                middle: true,
            })}`,
            nationalID: teacherChance.integer({
                min: 10000000000000,
                max: 99999999999999,
            }),
        };
        await User.create(teacherData)
            .then((user: any) => {
                user.setPassword(
                    String(teacherData.nationalID),
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
                await Teacher.create({ user: user._id });
            })
            .then(() => {
                done++;
                if (done === 9) {
                    exit();
                }
            });
    }
};

classes();
