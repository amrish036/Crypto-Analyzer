const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database

//mongodb://amrish:amrish036@ds037067.mlab.com:37067/cryptodata
const dbRoute = "mongodb://amrish:amrish036@ds037067.mlab.com:37067/cryptodata";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var MongoClient = require('mongodb').MongoClient;

var fullData = [Data];

MongoClient.connect(dbRoute, function (err, db) {
  if (err) throw err;
  var dbo = db.db();
  dbo.collection("data").find({}).toArray(function (err, result) {
    if (err) throw err;
    fullData = result;
    console.log(result);
  });
});

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


router.get("/getData", (req, res) => {
  var dbo = db;
  dbo.collection("data").find({}).toArray(function (err, result) {
    if (err) throw err;
    fullData = result;
    console.log(result);
    return res.json({ success: true, data: fullData })
  });
});

router.get("/fetchNewData", (req, res) => {
  console.log((req.query.date));
  console.log(req.query.currency);
  var query = { $or: [{date: req.query.date}, {currency: req.query.currency}] }
  console.log(query);
  db.db.collection("data").find(query).toArray(function (err, result) {
    if (err) throw err;
    fullData = result;
    console.log("New data fetched..." + fullData)
    return res.json(({ success: true, data: fullData }))
  });
})

// append /api for our http requests
app.use("/api", router);

//Unhandled Exception
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));