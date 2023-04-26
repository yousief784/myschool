import { NextFunction, Request, Response } from 'express';
import { logger } from '../../app';

class ParentController {
    getChildren = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('I am a parent');
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default ParentController;
