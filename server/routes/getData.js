var express = require('express');
var router = express.Router();

// Get all quotes 

router.get('/', (req, res) => {

  var dbo = req.db;

  dbo.collection('data').find({}).toArray(function (err, result) {
    if (err) throw err;
    fullData = result;
    console.log(result);
    return res.json({ success: true, data: fullData })
  });
});

module.exports = router;