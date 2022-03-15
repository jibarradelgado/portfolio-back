const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = await controller.addAssetType(req.body.user, req.body.name, req.body.target_percentage, req.body.target_threshold);
    response.success(req, res, body, 201);
  } catch (error) {
    console.error(`[POST/assetType]: ${error}`);
    response.error(req, res, "Server Error", 500);
  }
});

router.get('/', async (req, res) => {
  try {
    const filterAssetTypesByName = req.query.name || null;
    const allAssetTypes = await controller.getAssetTypes(filterAssetTypesByName);
    response.success(req, res, allAssetTypes, 200);
  } catch(error) {
    response.error(req, res, "Error getting asset types", 500, error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
  const data = await controller.updateAssetType(req.params.id, req.body.name);
  response.success(req, res, data, 200);
  } catch (error) {
    console.error(`[PATCH/assetType]: ${error}`);
    response.error(req, res, "Server Error", 500, error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await controller.deleteAssetType(req.params.id);
    response.success(req, res, `Asset Type ${req.params.id} removed`, 200);
  } catch (error) {
    response.error(req, res, "Server Error", 500, error);
  }
});

module.exports = router;