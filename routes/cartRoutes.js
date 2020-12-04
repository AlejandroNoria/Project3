const auth = require("../controllers/authController")
const cart = require("../controllers/cartController")
const express = require('express');
const {body, validationResult} = require('express-validator');
const cartRouter = express.Router();



cartRouter.use(auth.protect)
cartRouter.route('/').get(cart.get).post(cart.add).patch(cart.update).delete(cart.delete)


module.exports = cartRouter;