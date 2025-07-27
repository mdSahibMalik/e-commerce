const { ObjectId } = require("mongodb");
const { getdb, getClient } = require("../../middleware/connection");
const OrderModel = require("./order.model");


class OrderRepository {
    constructor() {
        this.collection = 'order';
    }

    async createOrder(userId) {
        const client = getClient()
        const session = client.startSession();
        try {
            const db = getdb();
            //* 1. get total amout
            session.startTransaction()
            const items = await this.getTotalAmount(userId, session);
            const finalTotalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);

            //* 2. create order record 
            const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date());
            await db.collection(this.collection).insertOne(newOrder, { session });

            //* 3. reduce the product stock
            for (let item of items) {
                await db.collection('product').updateOne(
                    { _id: item.productId },
                    { $inc: { stock: -item.quantity } }, { session }
                )
            }
            // throw new Error('here i m stop operation');
            //* 4. clear the cart items
            await db.collection('cartItem').deleteMany({
                userId: new ObjectId(userId)
            }, { session });
            await session.commitTransaction();
            await session.endSession();
            return;
        } catch (error) {
            if (session.inTransaction()) {
                await session.abortTransaction();
            }
            await session.endSession();
            console.log(error);
        }
    }
    async getTotalAmount(userId, session) {
        const db = getdb();
        const items = await db.collection('cartItem').aggregate([
            { $match: { userId: new ObjectId(userId) } },

            //* get product from product collection;
            {
                $lookup:
                {
                    from: "product",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            {
                $unwind: "$productInfo"
            },
            {
                //* add another field to calculated amount
                $addFields: {
                    "totalAmount": {
                        $multiply: ["$productInfo.price", "$quantity"]
                    }
                }
            }
        ], { session }).toArray();
        return items;

    }
}

module.exports = OrderRepository;