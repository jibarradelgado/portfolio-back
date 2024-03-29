const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const secure = require('./secure');
const router = express.Router();

router.post('/', secure.checkAuth('post'), async (req, res) => {
  try {
    const body = await controller.addAsset(req.body.user, req.body.name, req.body.value);
    response.success(req, res, body, 201);
  } catch (error) {
    console.error(`[POST/asset]: ${error}`);
    response.error(req, res, "Server Error", 500);
  }
});

router.get('/', async (req, res) => {
  try {
    const filterAssetsByName = req.query.name || null;
    const allAssets = await controller.getAssets(filterAssetsByName);
    response.success(req, res, allAssets, 200);
  } catch(error) {
    response.error(req, res, "Error getting Assets", 500, error);
  }
});

router.get('/:user/:auth', secure.checkAuth('get'), async (req, res) => {
  try {
    const assetsForUser = await controller.getAssetsByUserId(req.params.user);
    response.success(req, res, assetsForUser, 200);
  } catch (error) {
    response.error(req, res, "Error while getting Assets", 500, error);
  }
});

router.patch('/:id', secure.checkAuth('patch'), async (req, res) => {
  try {
  const data = await controller.updateAsset(req.params.id, req.body.name, req.body.value);
  response.success(req, res, data, 200);
  } catch (error) {
    console.error(`[PATCH/asset]: ${error}`);
    response.error(req, res, "Server Error", 500, error);
  }
});

router.delete('/:id/:auth', secure.checkAuth('delete'), async (req, res) => {
  try {
    await controller.deleteAsset(req.params.id);
    response.success(req, res, `Asset ${req.params.id} removed`, 200);
  } catch (error) {
    response.error(req, res, "Server Error", 500, error);
  }
});

module.exports = router;