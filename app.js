var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Pool } = require('pg');

const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'taskdb',
      password: '112233',
      port: 5432,
    })

var indexRouter = require('./routes/index');
var taskRouter = require('./routes/task')(pool);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/task', taskRouter);

module.exports = app;
