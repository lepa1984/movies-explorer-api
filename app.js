require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const routers = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(express.json());
app.use(limiter);
app.use(helmet());
app.use(requestLogger);
app.use(cors);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routers);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен! Порт: ${PORT}`);
});
