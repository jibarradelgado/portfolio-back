const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: String,
  auth: {
    type: Schema.ObjectId,
    ref: 'Auth',
  },
});

const model = mongoose.model('User', mySchema);
module.exports = model;