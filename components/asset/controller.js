const store = require('./store');

function addAsset(asset) {
  return new Promise((resolve, reject) => {
    if (!asset) {
      console.error('[assetController] There is no asset');
      reject('Incorrect data');
    }

    const fullAsset = {
      asset: asset,
    };
    store.add(fullAsset);
    resolve(fullAsset);
  });
}

function getAssets() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
}

module.exports = {
  addAsset,
  getAssets,
}