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
    async addCartItem(req, res) {
        try {
            const { productId, quantity } = req.body;
            const userId = req.userId;
            const result = await this.cartItemRepository.addCartItem({ productId: new ObjectId(productId), quantity, userId: new ObjectId(userId) });
            if (result.acknowledged && result.insertedId) {
                return res.status(201).send("Cart item added successfully.. ");
            } else {
                return res.status(400).send("something went wrong");
            }

        } catch (error) {
            console.log(error)
        }
    }

    // getCartData(req, res) {
    //     const userId = req.userId;
    //     const result = CartItemsModel.get(userId);
    //     res.status(200).send(result);
    // }
    //! get cart item using cart repository 
    async getCart(req, res) {
        try {
            const userId = req.userId;
            const result = await this.cartItemRepository.getCartItem(new ObjectId(userId));
            if (result.length === 0) {
                return res.status(404).send("No such product found...");
            }
            return res.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    }

    //! delete cart item using cart model

    // deleteCartItems(req, res) {
    //     const  productId  = req.body;
    //     console.log('this is product id ' , productId);
    //     const userId = req.userId;
    //     const deleteItem = this.cartItemRepository.deleteCartItem(userId, productId);
    //     if (deleteItem === 'UnAuthorized product or not found') {
    //         return res.status(401).send('Unauthorized prouduct');
    //     }
    //     return res.status(200).send('product removed successfully..');

    // }
    //! delete cart item with cart repository 
    async deleteCartItems(req, res) {
        const cartItemId = req.body;
        const userId = req.userId;
        const deleteItem = await this.cartItemRepository.deleteCartItem( userId, cartItemId );
        if (deleteItem === "Deleted successfully") {
            return res.status(200).send("delete successfully..")
        } else {
            return res.status(404).send("something went wrong.. ");
        }
    }
}

module.exports = CartItemsController;