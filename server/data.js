const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DataSchema = new Schema(
    {
      currency: String,
      date: String,
      quotes: Array,
    }
  );

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);