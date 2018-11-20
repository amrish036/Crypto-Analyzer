const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./Schema/data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

const dbRoute = "mongodb://amrish:amrish036@ds037067.mlab.com:37067/cryptodata";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

// connects to the database
db.once("open", () => console.log("connected to the database"));
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use("/api", router);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


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
  var query = { $or: [{date: req.query.date}, {currency: req.query.currency}] }
  db.db.collection("data").find(query).toArray(function (err, result) {
    if (err) throw err;
    fullData = result;
    console.log("New data fetched..." + fullData)
    return res.json(({ success: true, data: fullData }))
  });
})

// launch our server into the port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));