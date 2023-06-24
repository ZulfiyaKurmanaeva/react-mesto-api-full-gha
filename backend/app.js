/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const router = require('./routes/router');

const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handelError');
const { validationCreateUser, validationLogin } = require('./middlewares/validations');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { createUser, login } = require('./controllers/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(auth);
app.use(limiter);

app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(helmet());
app.use(handleError);

const { MONGO_DB, PORT } = require('./config');

mongoose.connect(MONGO_DB);

async function start() {
  try {
    await mongoose.connect(MONGO_DB);
    await app.listen(PORT);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

start()
  // eslint-disable-next-line no-console
  .then(() => console.log(`Приложение успешно запущенно!\n${MONGO_DB}\nPort: ${PORT}`));
