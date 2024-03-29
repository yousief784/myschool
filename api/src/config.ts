import dotenv from 'dotenv';

dotenv.config();

const {
    PORT,
    MONGO_URL,
    MONGO_URL_TEST,
    AUTH_TOKEN_SECRET,
    NODE_ENV,
    UPLOADED_FILES,
    EMAIL_HOST,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_SERVICE,
    CLIENT_URL,
    SESSION_SECRET,
} = process.env;

export default {
    port: PORT,
    mongoUrl: NODE_ENV === 'development' ? MONGO_URL : MONGO_URL_TEST,
    authTokenSecret: AUTH_TOKEN_SECRET,
    uploadedFiles: UPLOADED_FILES,
    emailHosst: EMAIL_HOST,
    emailUser: EMAIL_USER,
    emailPass: EMAIL_PASS,
    emailService: EMAIL_SERVICE,
    clientUrl: CLIENT_URL,
    sessionSecret: SESSION_SECRET,
};
