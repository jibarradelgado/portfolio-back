const Model = require("./model");

function addAssetType(assetType) {
  try {
    const myAssetType = new Model(assetType);
    myAssetType.save();
  } catch (error) {
    return error;
  }
}

async function getAssetTypes(filterAssetTypesByName) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterAssetTypesByName !== null) {
      filter = { name: filterAssetTypesByName};
    }
    Model.find(filter)
      .populate('user')
      .exec((error, populated) => {
        if (error) {
          reject(error);
        }
        resolve(populated);
      })
  });
}

async function updateAssetType(id, name) {
  const assetType = await Model.findOne({
    _id: id
  });

  assetType.name = name;
  const newAssetType = await assetType.save();
  return newAssetType;
}

function removeAssetType(id) {
  return Model.deleteOne({
    _id:id
  })
}

module.exports = {
  add: addAssetType,
  list: getAssetTypes,
  updateAssetType: updateAssetType,
  remove: removeAssetType,
}