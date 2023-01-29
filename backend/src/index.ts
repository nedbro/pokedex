import * as express from 'express';
import * as cors from 'cors';
import { Express, NextFunction, Request, Response } from 'express';
import { AppError } from './AppError';
import { queryNameValidator as queryPokemonNameValidator } from './validators';
import { getPokemonByName } from './PokemonController';

const app: Express = express();
app.use(express.json());
app.use(cors());

const port = 8000;
const basePath = "/api";

app.get(`${basePath}/pokemons`, queryPokemonNameValidator, getPokemonByName);

const errorHandler = (error: AppError | Error, req: Request, res: Response, next: NextFunction) => {
  console.error("An error occurred", error.message)
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  return res.status(statusCode).json({ errorMessage: error.message });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


