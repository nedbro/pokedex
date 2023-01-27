import * as express from 'express';
import { Express, NextFunction, Request, Response } from 'express';
import { AppError } from './AppError';

const app: Express = express();
app.use(express.json());

const port = 8000;
const basePath = "/api";


const errorHandler = (error: AppError | Error, req: Request, res: Response, next: NextFunction) => {
  console.error("An error occurred", error.message)
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  return res.status(statusCode).json({ errorMessage: error.message });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


