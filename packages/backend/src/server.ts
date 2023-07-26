import bodyParser from 'body-parser';
import express, { Response, Request, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import AppRouter from './routes';
import connectDB from './config/database';
import { IError } from './types/servises.type';

const app = express();
const router = new AppRouter(app);
// Connect to MongoDB
connectDB();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// Express configuration
app.set('port', process.env.PORT || 4200);
app.use(logger(formatsLogger));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();

app.use((_req: Request, res: Response) => {
  res.status(404).json({ code: 404, message: 'Not found route' });
});

app.use((err: IError, _req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ code: status, message });
  next();
});

const port = app.get('port');
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
