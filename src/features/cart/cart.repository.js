const { ObjectId } = require("mongodb");
const { getdb } = require("../../middleware/connection");

class CartItemRepository {
    constructor() {
        this.collection = "cartItem";
    }

    async addCartItem( productId, quantity,userId) {
        try {
            
            const db = getdb();
            const collection = await db.collection(this.collection);
            const addedCartItem = await collection.updateOne({userId:new ObjectId(userId) , productId: new ObjectId(productId)},
            {$inc: {quantity : quantity}},{upsert: true});
            return addedCartItem;
            
        } catch (error) {
            console.log(error);
        }

    }

    async getCartItem(userId) {
        try {
            const db = getdb();
            const collection = await db.collection(this.collection);
            const existData = await collection.find({ userId }).toArray();
            return existData;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCartItem(userId, cartItemId) {
        try {

            const cartItemIdValue = typeof cartItemId === "object" && cartItemId._id
                ? cartItemId._id
                : cartItemId;

            if (!ObjectId.isValid(userId) || !ObjectId.isValid(cartItemIdValue)) {
                throw new Error("Invalid ObjectId format.");
            }

            const db = getdb();
            const collection = db.collection(this.collection);

            const result = await collection.deleteOne({
                userId: new ObjectId(userId),
                _id: new ObjectId(cartItemIdValue) // assuming this is the cart item’s _id
            });

            if (result.deletedCount === 1) {
                return "Deleted successfully";
            }
            return "No matching item found";
        } catch (error) {
            console.error("Error deleting cart item:", error.message);
            throw error;
        }
    }



}
module.exports = CartItemRepository;