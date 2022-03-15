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
  target_percentage: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  target_threshold: {
    type: Schema.Types.Decimal128,
    required: true,
  }
});

const model = mongoose.model('Asset_Type', mySchema);
module.exports = model;