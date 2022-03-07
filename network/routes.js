const express = require('express');
const asset = require('../api/components/asset/network');
const user = require('../api/components/user/network');

const routes = function(server) {
  server.use('/asset', asset);
  server.use('/user', user);
}

module.exports = routes;