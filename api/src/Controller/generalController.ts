import { Request, Response, NextFunction } from 'express';
import TermDate from '../schema/termDateSchema';
import { logger } from '../app';

class GeneralController {
    getTermDate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const termDate = await TermDate.findOne({
                isDeleted: false,
            }).select(['startDate', 'endDate']);

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
}

export default GeneralController;
