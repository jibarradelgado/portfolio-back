const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Schema.Types.Decimal128,
    required: true,
  },
});

const model = mongoose.model('Asset', mySchema);
module.exports = model;