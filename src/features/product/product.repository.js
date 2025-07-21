const { ObjectId } = require("mongodb");
const { getdb } = require("../../middleware/connection.js");

class ProductRepository {
    constructor() {
        this.collection = "product"
    }

    async addProduct(newProduct) {
        try {
            const db = getdb()
            const collection = await db.collection(this.collection);
            const addedProduct = await collection.insertOne(newProduct);
            return addedProduct;

        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const db = getdb()
            const collection = await db.collection(this.collection);
            const products = await collection.find().toArray();
            return products
        } catch (error) {
            console.log(error);
        }
    }

    async getOne(id) {
        try {
            if (!ObjectId.isValid(id)) {
                return ("Invalid product ID");
            }
            const db = getdb();
            const collection = await db.collection(this.collection);
            const prodcuct = await collection.findOne({ _id: new ObjectId(id) });

            return prodcuct;

        } catch (error) {
            console.log(error);
        }
    }

    //* filter product 

    async filterProduct(minPrice, maxPrice, category) {
        try {
            const db = getdb();
            const collection = await db.collection(this.collection);
            let filterExpression = {};

            if (maxPrice) {
                filterExpression.price = { $lte: maxPrice }
            }
            if (minPrice) {
                filterExpression.price = { ...filterExpression.price, $gte: minPrice };
            }
            if (category) {
                filterExpression.category = category;
            }
            const products = await collection.find(filterExpression).toArray();
            return products;

        } catch (error) {
            console.log(error);
            res.status(401).send("something went wrong");
        }
    }

    //* Add rating 
    async addRating(userId, productId, rating) {
        try {
            if (!ObjectId.isValid(productId)) {
                return false;
            }
            const db = getdb();
            const collection = db.collection(this.collection);

            const productObjectId = new ObjectId(productId);
            const userObjectId = new ObjectId(userId);

            await collection.updateOne(
                { _id: productObjectId },
                { $pull: { ratings: { userId: userObjectId } } }
            );

            const result = await collection.updateOne(
                { _id: productObjectId },
                { $push: { ratings: { userId: userObjectId, rating } } }
            );

            if (result.modifiedCount === 0) {
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = ProductRepository;