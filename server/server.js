const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const appSettings = require('./config/appSettings');

const API_PORT = appSettings.API_Port;
const dbRoute = appSettings.MongoDB;

const getDataRouter = require('./routes/getData');
const fetchNewDataRouter = require('./routes/fetchNewData');

const app = express();
const router = express.Router();

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

// connects to the database
db.once("open", () => console.log('connected to the database'));
db.on("error", console.error.bind(console, 'MongoDB connection error:'));

app.use(function (req, res, next) {
  req.db = db;
  next();
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api', router);
app.use('/api/getData', getDataRouter);
app.use('/api/fetchNewData', fetchNewDataRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('500 - Internal Server Error');
});

// launch our server into the port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));