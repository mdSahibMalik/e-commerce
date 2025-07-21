const { getdb } = require("../../middleware/connection");

class CartItemRepository {
    constructor() {
        this.collection = "cartItem";
    }

    async addCartItem(newCartItem) {
        try {
            const db = getdb();
            const collection = await db.collection(this.collection);
            const addedCartItem = await collection.inserOne(newCartItem);
            return addedCartItem;

        } catch (error) {
            console.log(error);
        }

    }
}
module.exports = CartItemRepository;