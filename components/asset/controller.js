const store = require('./store');

function addAsset(name, value) {
  return new Promise((resolve, reject) => {
    if (!name || !value) {
      console.error('[assetController] There is no asset');
      reject('Incorrect data');
    }

    const fullAsset = {
      name: name,
      value: value
    };
    store.add(fullAsset);
    resolve(fullAsset);
  });
}

function getAssets() {
  return new Promise((resolve, reject) => {
    if(store.list()) {
      resolve(store.list());
    } else {
      reject('[assetControleler]: There are no saved assets');
    }
  });
}

module.exports = {
  addAsset,
  getAssets,
}