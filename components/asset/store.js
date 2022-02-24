const list = [];

function addAsset(asset) {
  list.push(asset);
}

function getAssets() {
  return list;
}

module.exports = {
  add: addAsset,
  list: getAssets,
  //get
  //update
  //delete
}