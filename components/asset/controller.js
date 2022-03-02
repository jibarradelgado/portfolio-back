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

function getAssets(filterAssetsByName) {
  return new Promise((resolve, reject) => {
    if(store.list()) {
      resolve(store.list(filterAssetsByName));
    } else {
      reject('[assetController]: There are no saved assets');
    }
  });
}

function updateAsset(id, name) {
  return new Promise(async (resolve, reject) => {
    if (!id || !name) {
      reject('[assetController]: Invalid data');
    }

    const result = await store.updateAsset(id, name);
    resolve(result);
  });
}

function deleteAsset(id) {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      reject('[assetController]: Invalid data');
    }

    const result = await store.remove(id);
    resolve(result);
  })
}

module.exports = {
  addAsset,
  getAssets,
  updateAsset,
  deleteAsset,
}