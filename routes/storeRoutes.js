const storeData = require('../data/storeData');
const express = require('express');
const storeRouter = express.Router();
const item = require("../controllers/itemController")

storeRouter.route('/').get(item.get).post(item.create);
storeRouter.route('/:id').patch(item.update).post(item.delete);


module.exports = storeRouter;