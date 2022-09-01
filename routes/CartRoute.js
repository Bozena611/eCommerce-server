const express = require('express');
const router = express.Router();
const controller = require('../controllers/CartController');



// add product to cart
router.post('/cart/add', controller.addProductToCart); 

// cart page ?? show products in cart by userID
router.get('/cart/:user_id', controller.showCartItems); 

// remove product from cart
router.delete('/cart/remove', controller.removeProductFromCart); 

// check if product is in cart or not
//router.get('/cart/:_id/:product_id', controller.checkProdInCart)

// update qty - increase, decrease
//router.post('/cart/update', controller.updateQuantity); 

// clear cart
router.post('/cart/clear', controller.clearCart); 



//go to checkout page		- cart
//???


module.exports = router;