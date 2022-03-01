const db = require("mongoose");
const model = require("./model");

db.Promise = global.Promise;
db.connect('mongodb+srv://db_user_portfolio:ygQZIvAVBSLQFwQl@cluster0.n227s.mongodb.net/portfolioDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

console.log('[db]: Successful connection');

function addAsset(asset) {
  try {
    const myAsset = new model(asset);
    myAsset.save();
  } catch (error) {
    return error;
  }
}

async function getAssets() {
  const assets = await model.find();
  return assets;
}

module.exports = {
  add: addAsset,
  list: getAssets,
  //get
  //update
  //delete
}