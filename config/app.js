import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import authRoutes from '../src/auth/auth.routes.js';
import levelRoutes from '../src/level/level.routes.js';
import questionRoutes from '../src/question/question.routes.js';
import progressRoutes from '../src/progress/progress.routes.js';

const configs = (app) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }))

  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }))

  app.use(morgan('dev'));

  app.use('/uploads/img/levels', express.static(path.resolve('upload/img/levels')))
}

const routes = (app) => {
  app.use('/v1', authRoutes)
  app.use('/v1/levels', levelRoutes)
  app.use('/v1/questions', questionRoutes)
  app.use('/v1/progress', progressRoutes)

  app.get('/v1/levels/ping', (_req, res) => res.send({ ok: true }))
}

export const initServer = () => {
  const app = express();
  try {
    configs(app)
    routes(app)

    const PORT = process.env.PORT || 2636
    app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
  } catch (err) {
    console.error('Server init failed', err)
  }
}
