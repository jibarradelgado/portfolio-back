const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allAssets = await controller.getAssets();
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
    response.error(req, res, "Error interno", 500);
  }
});

module.exports = router;