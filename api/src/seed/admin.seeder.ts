import database from '../database';
import Admin from '../schema/adminSchema';
import User from '../schema/userSchema';

const user = {
    parentName: 'admin admin',
    isDeleted: false,
    _id: '634cb1879ff4ec5e761e933a',
    nationalID: '00000000000000',
    // password: adminadmin
    salt: '01da09e703e2851dcd500da87dd098a99cafc04d03f8cd2c39a804aeea059505',
    hash: '94de113d0552fa9ab7fc07c924d321107342e686f9a6cf8164e574eccd5c5cd9e700c46e41da84ee837412865a39b02d1f8381b2a2501d9eeb9adfc0d86ac391162749ebc75cee816dae0c205dfae8173f03582742c0f44954c5be9ff3755440b7e13eb4d171ec609955d81f02a8b043ec280278e53db57b49497da41d061b15d04bfd44eb44af7b2dda2f0ffb71a8fbcb8c4e4c235dc8f14dd9e1b90326b827d950c513726fc1da8e69612e3954d8b6d784f811d7c17b02fe4caa2cca56fb46b537ef752c373690809190e6753e2be9041ea3256add1d9864607041236ea4da93a9eb3757d1b87d8362f685b2ca23738dee3237a54fa3f23ec904a981249e58f663935d57e649f7a4e8fa42c232c4a18e13275ac05b6c130975f37d4d63ef229e09b7db7e608a54598c8aa23db323867c6180004633d7930e132c7a35931d7b265e4a2ed5a41c19d5b30cdf3cd19969b795ec4c79ef31d3e2b79940479d571e0ccfd0093552d831e2475e1fb65b42e540bcd9a4e25954b8093c1e9c41dd3b608f273e3c9af1df276a729923ac0133eb9dcae2bdf315f5534c1eb98aa8bb97d1cf02483d8fc7c2fb6ab0ec401cfd0b88ade68c42cff9b4d4fcbcb6ee48060336f0d8e8156340c4ddeb00b03817306ff9a5f51e1ba0317fda74d8eb48d835f31ccfd110929637a83e3f46253694036e22fa5b4d8c60658bdf247db4b5969eb47b',
};

const admin = () => {
    database.connect();
    let done = 0;

    for (let i = 0; i < 1; i++) {
        User.create(user).then((user) => {
            Admin.create({
                _id: '634f4e27fbecdac0f1b6bd55',
                user: user._id,
            }).then(() => {
                done++;
                if (done === 1) {
                    exit();
                }
            });
        });
    }

    const exit = () =>
        database.disconnect().then(() => {
            console.log('Database disconnect');
        });
};

admin();
