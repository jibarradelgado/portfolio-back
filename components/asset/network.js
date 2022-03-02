const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filterAssetsByName = req.query.name || null;
    const allAssets = await controller.getAssets(filterAssetsByName);
    response.success(req, res, allAssets, 200);
  } catch(error) {
    response.error(req, res, "Error getting Assets", 400, error);
  }
});

router.post('/', async (req, res) => {
  try {
    const body = await controller.addAsset(req.body.name, req.body.value);
    response.success(req, res, body, 201);
  } catch (error) {
    console.error(`[POST/asset]: ${error}`);
    response.error(req, res, "Server Error", 500);
  }
});

router.patch('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
  const data = await controller.updateAsset(req.params.id, req.body.name);
  response.success(req, res, data, 200);
  } catch (error) {
    console.error(`[PATCH/asset]: ${error}`);
    response.error(req, res, "Server Error", 500, error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await controller.deleteAsset(req.params.id);
    response.success(req, res, `Asset ${req.params.id} removed`, 200);
  } catch (error) {
    response.error(req, res, "Server Error", 500, error);
  }
});

module.exports = router;