import database from '../database';
import Admin from '../schema/adminSchema';
import Class from '../schema/classSchema';
import User from '../schema/userSchema';

const classesName = [
    'First Year',
    'Second Year',
    'Third Year',
    'Fourth Year',
    'Fifth Year',
    'Sixth Year',
];

const classes = async () => {
    database.connect();
    let done = 0;

    const exit = () =>
        database.disconnect().then(() => {
            console.log('Database disconnect');
        });
    for (let i = 0; i < 6; i++) {
        await Class.create({ className: classesName[i], classId: i + 1 }).then(
            () => {
                done++;
                if (done === 6) {
                    exit();
                }
            }
        );
    }
};

classes();
