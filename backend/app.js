// Импорты пакетов
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

// Импорты самописных данных
const { PORT } = require('./utils/config');
const responseError = require('./middlewares/response-error');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Создать приложение
const app = express();

app.use(cors({ 'Access-Control-Allow-Credentials': true }));

app.use(express.json()); // переводит входящие запросы в json
app.use(helmet()); // защита от веб-уязвимостей
app.use(cookieParser()); // для извлечения данных из куков

// Подключение к базе данных
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger); // подключаем логгер запросов

app.use(router);

app.use(errorLogger); // подключаем логгер ошибо

// Обработчики ошибок(celebrate и централизованный)
app.use(errors());
app.use(responseError);

// Прослушивание порта
app.listen(PORT);
