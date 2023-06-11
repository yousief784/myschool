import express, { Application, NextFunction, Request, Response } from 'express';
import config from './config';
import database from './database';
import router from './routes/index.routes';
import localStrategy from './apis/passport/localStrategy';
import session from 'express-session'; // session middleware
import bodyParser from 'body-parser';
import jwtStr from './apis/passport/passport-jwt';
import CheckFoldersExists from './utils/createFolders';
import cors from 'cors';
import helmet from 'helmet';
import winston from 'winston';
import { Error as MongooseError } from 'mongoose';

const app: Application = express();
const port: number = parseInt(config.port as string) || 5000;

// check if all folderAreExists
const checkFoldersExists = new CheckFoldersExists();
checkFoldersExists.foldersAreExists();

app.use(cors({ origin: '*' }));

// for Security
app.use(helmet());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

// get images from the server
app.use(express.static('public'));
app.use('/uploads', express.static('public'));

// request.body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// session for authentication
app.use(
    session({
        secret: config.sessionSecret as string,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
    })
);

// Configure Middleware
app.use(localStrategy);
jwtStr.jwtStrategyMiddleware();

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports: [new winston.transports.File({ filename: 'error.log' })],
});

app.use('/api', router);
app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({
        status: 200,
        message: 'Welcome in  our Application!',
    });
});

// Add the validation error handling middleware to your app
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof MongooseError.ValidationError) {
        // Log the validation error using your Winston logger
        logger.error('A validation error occurred', { error: err });
        if (err.name === 'ValidationError') {
            let errors: any = {};

            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });

            return res.status(400).send(errors);
        }
        res.status(500).send('Something went wrong');
    } else {
        next(err);
    }
});

app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
    database.connect();
});
