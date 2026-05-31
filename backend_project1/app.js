require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http=require('http');
const cors = require('cors');

const {connectToMongoDB} = require('./config/mongo.connection');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth.routes');
var usersRouter = require('./routes/users.routes');
var memberRouter = require('./routes/member.routes');
var paymentRouter = require('./routes/payment.routes');
var programmeRouter = require('./routes/programme.routes');
var coachRouter = require('./routes/coach.routes');
var abonnementRouter = require('./routes/abonnement.routes');
var progressionRouter = require('./routes/progression.routes');
var seanceRouter = require('./routes/seance.routes');



var app = express();

//CORS CONFIGURATION: le backend doit autoriser les requêtes provenant du frontend.
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Autoriser uniquement le frontend 
  credentials: true, // Autoriser les cookies et les informations d'identification 
  optionsSuccessStatus: 200, // Pour les navigateurs qui ne gèrent pas les codes d'état 204
  methods: 'GET,PUT,POST,DELETE,PATCH', // Méthodes HTTP autorisées
  allowedHeaders: 'Content-Type,Authorization', // En-têtes autorisés
};

app.use(cors(corsOptions)); // Appliquer la configuration CORS à toutes les routes

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/users', usersRouter);
app.use('/api/members', memberRouter);      // ✅ ajout /api/
app.use('/api/payments', paymentRouter);    // ✅ ajout /api/
app.use('/api/programme', programmeRouter);
app.use('/api/coaches', coachRouter);
app.use('/api/abonnements', abonnementRouter);
app.use('/api/progressions', progressionRouter);
app.use('/api/seances', seanceRouter);


// catch 404 and forward to error handler
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend connecté"
  });
});

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message || 'Server error',
    status: err.status || 500,
  });
});

connectToMongoDB();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});




