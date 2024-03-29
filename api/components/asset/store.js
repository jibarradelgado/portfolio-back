const Model = require("./model");

function addAsset(asset) {
  try {
    const myAsset = new Model(asset);
    myAsset.save();
  } catch (error) {
    return error;
  }
}

async function getAssets(filterAssetsByName) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterAssetsByName !== null) {
      filter = { name: filterAssetsByName};
    }
    Model.find(filter)
      .populate('user')
      // .populate('asset_type')
      .exec((error, populated) => {
        if (error) {
          reject(error);
        }
        resolve(populated);
      })
  });
}

async function getAssetsForUser(filterByUserId) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterByUserId !== null) {
      filter = { user: { _id: filterByUserId }};
    }
    Model.find(filter)
      .populate('user')
      // .populate('asset_type')
      .exec((error, populated) => {
        if (error) {
          reject(error);
        }
        resolve(populated);
      })
  });
}

async function updateAsset(id, name, value) {
  const asset = await Model.findOne({
    _id: id
  });

  asset.name = name;
  asset.value = value;
  const newAsset = await asset.save();
  return newAsset;
}

function removeAsset(id) {
  return Model.deleteOne({
    _id:id
  })
}

module.exports = {
  add: addAsset,
  list: getAssets,
  listByUserId: getAssetsForUser,
  updateAsset: updateAsset,
  remove: removeAsset,
}