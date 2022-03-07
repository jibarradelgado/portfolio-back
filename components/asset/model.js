const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
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