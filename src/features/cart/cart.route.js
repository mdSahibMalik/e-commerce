const express = require('express');
const cartRouter = express.Router();
const CartItemsController = require('./cart.controller.js');
const cartItemsController = new CartItemsController()

// add cart item 
cartRouter.post('/', (req, res)=>{
    cartItemsController.addCartItem(req, res);
});

//* get all cart items 
cartRouter.get('/', cartItemsController.getCartData);

//* delete cart items
cartRouter.delete('/', cartItemsController.deleteCartItems);

module.exports = cartRouter;