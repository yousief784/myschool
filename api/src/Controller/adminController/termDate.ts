import { Request, Response, NextFunction } from 'express';
import { logger } from '../../app';
import TermDate from '../../schema/termDateSchema';

class TermDateController {
    index = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const termDate = await TermDate.find({ isDeleted: false }).select([
                'startDate',
                'endDate',
            ]);

            if (!termDate)
                return res.status(404).json({
                    status: 404,
                    message: 'Classes not found',
                });

            res.status(200).json({
                status: 200,
                data: termDate,
                message: 'get term date successfully',
            });
        } catch (error) {
            logger.error('An error occurred', { error: error });
            return next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { startDate, endDate } = req.body;

            if (!(startDate && endDate))
                return res.status(400).json({
                    status: 400,
                    message: 'Send startDate and endDate',
                });

            await TermDate.deleteMany();

            const createTermDate = await TermDate.create({
                startDate: startDate,
                endDate: endDate,
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
