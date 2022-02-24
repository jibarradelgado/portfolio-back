const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', function(req, res) {
  console.log(req.headers);
  res.header({
    "custom-header": "Our personalized value",
  });
  response.success(req, res, 'Lista de mensajes');
});

router.post('/', async (req, res) => {
  try {
    const body =  await controller.addAsset(req.body.asset);
    response.success(req, res, body, 201);
  } catch (error) {
    console.error(`[POST/asset]: ${error}`);
    response.error(req, res, "Error interno", 500);
  }
});

module.exports = router;