const express = require('express');
const asset = require('../components/asset/network');

const routes = function(server) {
  server.use('/asset', asset);
}

module.exports = routes;