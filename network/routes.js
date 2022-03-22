const express = require('express');
const asset = require('../api/components/asset/network');
const user = require('../api/components/user/network');
const assetType = require('../api/components/asset_type/network');
const auth = require('../api/components/auth/network');

const routes = function(server) {
  server.use('/asset', asset);
  server.use('/user', user);
  server.use('/asset_type', assetType);
  server.use('/auth', auth);
}

module.exports = routes;