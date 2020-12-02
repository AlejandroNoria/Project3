const storeData = require('../data/storeData');
const express = require('express');
const storeRouter = express.Router();
const item = require("../controllers/itemController")

storeRouter.route('/').get(item.getall).post(item.create);
storeRouter.route('/:id').patch(item.update).post(item.delete);



///////////////////////////////////////////////////////////
// 4.1: GET /StoreItem/:StoreItemID – Get the store item’s details
// storeRouter.get('/StoreItem/:StoreItemID', (req, res) => {
//     res.send(storeData.findById(parseInt(req.params.StoreItemID)));
// });
//
// ///////////////////////////////////////////////////////////
// // 4.2 GET /StoreItem?query=abc – Get all items that satisfy the regular expression query (or all items if no query)
// storeRouter.get('/StoreItem', (req, res) => {
//     let foundStoreItems = (storeData.find());
//     if (req.query.query) {
//         const re = new RegExp(req.query.query);
//         // We will search for names and descriptions, using regular expressions
//         foundStoreItems = foundStoreItems.filter(storeItem => {
//             return re.test(storeItem.description)
//             || re.test(storeItem.name);
//         })
//     }
//     res.send(foundStoreItems);
// });

module.exports = storeRouter;