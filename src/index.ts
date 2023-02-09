// ! // Importing Modules //
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

// ! // Import Logger //
import Logger from './lib/logger';
import { MORGAN_LOGGER, PORT, HOST } from './config/index';

// * // Import Root Route //
import rootRouter from './routes/root';

// * // Config Env. Values //
dotenv.config();

// @ // Create Server Instance //
const app: Express = express();

// @ //Middlewares
app.use(MORGAN_LOGGER);
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// * // Assigning Routers //
app.use('/', rootRouter);

// ! // Error Routes //
app.get('*', (req: Request, res: Response) => {
	return res.status(404).send({ status: false, message: '[ ❌ ] Route Not Found!', data: [] });
});

// ! // Error Routes //
app.post('*', (req: Request, res: Response) => {
	return res.status(404).send({ status: false, message: '[ ❌ ] Route Not Found!', data: [] });
});

app.listen(PORT, () => {
	Logger.debug(`[⚡️]: Server is running at ${HOST}:${PORT}`);
});
