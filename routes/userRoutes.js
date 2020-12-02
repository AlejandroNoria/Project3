const auth = require("../controllers/authController")

const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();

router.get('/',auth.getAll)
router.post('/signup',auth.create)
router.route('/:id').get(auth.getOne).patch(auth.update).delete(auth.delete)
router.post('/login',auth.login)
router.get('/logout',auth.logOut)


// Validation to enforce POSTman body is correct
// firstName
// lastName
// email
// const userValidators = [
//     body('firstName').isAlpha(),
//     body('lastName').isAlpha(),
//     body('email').isEmail(),
// ];
//
// // Supplemental route to get ALL users
// userRouter.get('/user', (req, res) => {
//     res.send(userData.find());
// });
//
// ///////////////////////////////////////////////////////////
// // 1.1: GET /user/:UserId – Gets the user info given the id
// userRouter.get('/user/:UserId', (req, res) => {
//     res.send(userData.findById(parseInt(req.params.UserId)));
// });
//
// ///////////////////////////////////////////////////////////
// // 1.2 POST/user – Creates a new user
// userRouter.post('/user', userValidators,
//     (req, res) => {
//     // This code validates the post body to make sure it has all the minimum pieces we need to create a user
//         if (!validationResult(req).isEmpty()) {
//             return res.status(400).json({errors: errors.array()});
//         }
//         res.send(userData.create(req.body));
//     }
// );
//
// ///////////////////////////////////////////////////////////
// // 2.1 GET /user/:UserId/cart Gets the user’s cart
// userRouter.get('/user/:UserId/cart', (req, res) => {
//     //find the user
//     const user = userData.findById(parseInt(req.params.UserId));
//     if (!user) {
//         return res.sendStatus(404);
//     }
//     //find the users cart, or send a 404
//     cart = cartData.findById(user.cartId);
//     if (!cart) {
//         return res.sendStatus(404);
//     }
//     res.send(cart.cartItems);
// });
//
// ///////////////////////////////////////////////////////////
// //2.2 DELETE /user/:UserId/cart  – Empties the user’s cart
// userRouter.delete('/user/:UserId/cart', (req, res) => {
//     const user = userData.findById(parseInt(req.params.UserId));
//     //find the user
//     if (!user) {
//         return res.send(404);
//     }
//     //find the users cart
//     cart = cartData.findById(user.cartId);
//     if (!cart) {
//         return res.send(404);
//     }
//     cart.cartItems = [];
//     res.send(cart.cartItems);
// });

module.exports = router;