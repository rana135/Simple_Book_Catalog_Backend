import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes/index";
const app: Application = express(); 

app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(cookieParser())

// Routes
 app.use('/api/v1', routes); 


//global error handler
 app.use(globalErrorHandler);


//handle not found
app.use((req : Request, res : Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errormessages: [{
      path: req.originalUrl,
      message: 'API Not Found'
    }]
  })
   next();
})  

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from Simple Book Catalog!')
})
export default app;
