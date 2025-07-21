const CartItemsModel = require('./cart.Model.js')
const jwtAuth = require('../../middleware/authJWT.middleware.js');
const CartItemRepository = require("./cart.repository.js");
const { ObjectId } = require('mongodb');


class CartItemsController {
    constructor() {
        this.cartItemRepository = new CartItemRepository()
    }
    // addRating(req, res) {
    //     const { productId, quantity } = req.body;
    //     const userId = req.userId;
    //     CartItemsModel.addCartItems(userId, productId, quantity);
    //     res.status(201).send('Item added successful.');
    // }
//!----------------------------------------------------------------------
//* using cart repository 
    async addCartItem(req,res){
        try {
            const {productId,quantity} = req.body;
            const userId = req.userId;
            const newCartItem = new CartItemsModel({productId : new ObjectId(productId), quantity, userId: new ObjectId(userId)});
            await this.cartItemRepository.addCartItem(newCartItem);
            return res.status(201).send("Cart item added successfully.. ");
        } catch (error) {
            console.log(error)
        }
    }

    getCartData(req, res) {
        const userId = req.userId;
        const result = CartItemsModel.get(userId);
        res.status(200).send(result);
    }

    deleteCartItems(req, res) {
        const {productId} = req.body;
        const userId = req.userId;
        const deleteItem = CartItemsModel.deleteCartItems(userId, productId);
        if (deleteItem === 'UnAuthorized product or not found') {
            return res.status(401).send('Unauthorized prouduct');
        }
        return res.status(200).send('product removed successfully..');

    }
}

module.exports = CartItemsController;