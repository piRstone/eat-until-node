import { NextFunction,Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    res.local.i18n = req.t;
    next();
}
