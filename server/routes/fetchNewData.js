var express = require('express');
var router = express.Router();

// Fetch new quotes based on requested currency and or currency type

router.get('/', (req, res) => {

  let currency = req.query.currency ? req.query.currency.toUpperCase() : '';

  var query = { $or: [{ date: req.query.date }, { currency: currency }] }
  var dbo = req.db;

  dbo.collection('data').find(query).toArray(function (err, result) {
    if (err) throw err;
    fullData = result;
    console.log('New data fetched...' + fullData)
    return res.json(({ success: true, data: fullData }))
  });

});

module.exports = router;