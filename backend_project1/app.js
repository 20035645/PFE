var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http=require('http');
const cors = require('cors');

const {connectToMongoDB} = require('./config/mongo.connection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.routes');
var memberRouter = require('./routes/member.routes');
var paymentRouter = require('./routes/payment.routes');
var gymClassRouter = require('./routes/gymclass.routes');
var coachRouter = require('./routes/coach.routes');
var abonnementRouter = require('./routes/abonnement.routes');
var fitnessprofileRouter = require('./routes/fitnessprofile.routes');
var accesslogRouter = require('./routes/accesslog.routes');

require('dotenv').config();

var app = express();

//CORS CONFIGURATION: le backend doit autoriser les requêtes provenant du frontend.
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Autoriser uniquement le frontend 
  credentials: true, // Autoriser les cookies et les informations d'identification 
  optionsSuccessStatus: 200, // Pour les navigateurs qui ne gèrent pas les codes d'état 204
  methods: 'GET,PUT,POST,DELETE', // Méthodes HTTP autorisées
  allowedHeaders: 'Content-Type,Authorization', // En-têtes autorisés
};

app.use(cors(corsOptions)); // Appliquer la configuration CORS à toutes les routes

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/members', memberRouter);
app.use('/payments', paymentRouter);
app.use('/gymclasses', gymClassRouter);
app.use('/coaches', coachRouter);
app.use('/abonnements', abonnementRouter);
app.use('/fitnessprofiles', fitnessprofileRouter);
app.use('/accesslogs', accesslogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});