const store = require('./store');

function addAssetType(user, name, target_percentage, target_threshold) {
  return new Promise((resolve, reject) => {
    if (!name || !user) {
      console.error('[assetTypeController] There is no asset type');
      reject('Incorrect data');
    }

    const fullAssetType = {
      user: user,
      name: name,
      target_percentage: target_percentage,
      target_threshold: target_threshold,
    };
    store.add(fullAssetType);
    resolve(fullAssetType);
  });
}

function getAssetTypes(filterAssetTypesByName) {
  return new Promise((resolve, reject) => {
    if(store.list()) {
      resolve(store.list(filterAssetTypesByName));
    } else {
      reject('[assetTypesController]: There are no saved asset types');
    }
  });
}

function updateAssetType(id, name) {
  return new Promise(async (resolve, reject) => {
    if (!id || !name) {
      reject('[assetTypeController]: Invalid data');
    }

    const result = await store.updateAssetType(id, name);
    resolve(result);
  });
}

function deleteAssetType(id) {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      reject('[assetTypeController]: Invalid data');
    }

    const result = await store.remove(id);
    resolve(result);
  })
}

module.exports = {
  addAssetType,
  getAssetTypes,
  updateAssetType,
  deleteAssetType,
}