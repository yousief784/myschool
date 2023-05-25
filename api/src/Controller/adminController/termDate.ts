import { Request, Response, NextFunction } from 'express';
import { logger } from '../../app';
import TermDate from '../../schema/termDateSchema';

class TermDateController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { startDate, endDate } = req.body;

            if (!(startDate && endDate))
                return res.status(400).json({
                    status: 400,
                    message: 'Send startDate and endDate',
                });

            await TermDate.deleteMany();

            const date1: any = new Date(startDate);
            const date2: any = new Date(endDate);
            const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // milliseconds in one week
            const timeDiffInMs = Math.abs(date2 - date1);
            const diffInWeeks = Math.floor(timeDiffInMs / oneWeekInMs);

            const createTermDate = await TermDate.create({
                startDate: startDate,
                endDate: endDate,
                numberOfWeeks: diffInWeeks,
            });

            if (!createTermDate)
                return res
                    .status(400)
                    .json({ status: 400, message: 'term date not created' });

            res.status(200).json({
                status: 200,
                message: 'set Date successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };
}

export default TermDateController;
