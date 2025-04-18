import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import httpStatus from 'http-status';

import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/GlobalErrorHandelers';


const app: Application = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Moto Maintain server.."
    })
});

app.use('/api/v1', router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})

export default app;