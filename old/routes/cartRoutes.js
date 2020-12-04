const auth = require("../controllers/authController")
const cart = require("../controllers/cartController")
const express = require('express');
const {body, validationResult} = require('express-validator');
const cartRouter = express.Router();



cartRouter.use(auth.protect)
cartRouter.route('/').get(cart.get).post(cart.add).patch(cart.update).delete(cart.delete)




// Validation to enforce POSTman body is correct
// storeItemId
// quantity
// const cartValidators = [
//     body('storeItemId').isNumeric(),
//     body('quantity').isNumeric(),
// ];



//
// // Supplemental route to get ALL users
// cartRouter.get('/cart', (req, res) => {
//     res.send(cartData.find());
// });
//
// ///////////////////////////////////////////////////////////
// // 3.1 POST/cart/:CartId/cartItem – Add a new item to the cart
// cartRouter.post('/cart/:CartId/cartItem', cartValidators,
//     (req, res) => {
//         // This code validates the post body to make sure it has all the minimum pieces we need to create a user
//         if (!validationResult(req).isEmpty()) {
//             return res.status(400).json({errors: errors.array()});
//         }
//         // Find the correct cart
//         const cart = cartData.findById(parseInt(req.params.CartId));
//         // Create a new cartItem from the body
//         const newCartItem = req.body;
//
//         // See if we already have same item in cart, if we do, add the quantity
//         const cartItemAlreadyInCart = cart.cartItems.find(cartItem => cartItem.storeItemId === newCartItem.storeItemId);
//         if (cartItemAlreadyInCart){
//             cartItemAlreadyInCart.quantity += newCartItem.quantity;
//         }
//         //If not, add it to the cart
//         else{
//             newCartItem.id = cart.nextCartItemId++;
//             cart.cartItems.push(newCartItem);
//         }
//
//         res.send(cart);
//     }
// );
//
// ///////////////////////////////////////////////////////////
// // 3.2 DELETE /cart/:CartId/cartItem/:cartItemId – Remove an item from the cart
// cartRouter.delete('/cart/:CartId/cartItem/:cartItemId', (req, res) => {
//     // Find the correct cart
//     const cart = cartData.findById(parseInt(req.params.CartId));
//     if (!cart){
//         return res.sendStatus(404);
//     }
//     //find the correct Item in that cart
//     const cartItem = cart.cartItems.find(cartItem => cartItem.id === parseInt(req.params.cartItemId));
//     // If it isn't found, return from function and send a 404
//     if (!cartItem){
//         return res.sendStatus(404);
//     }
//     // Else remove it from the array and send it.
//     const index = cart.cartItems.indexOf(cartItem);
//     cart.cartItems.splice(index, 1);
//     res.send(cartItem);
// });

module.exports = cartRouter;