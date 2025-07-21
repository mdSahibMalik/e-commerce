const UserModel = require("../user/user.model.js");
class ProductModel {
    constructor(name, desc, imageUrl, category, price, size,id) {
        this._id = id,
            this.name = name,
            this.desc = desc,
            this.imageUrl = imageUrl,
            this.category = category,
            this.price = price,
            this.size = size.split(',')
    }
    static getAll() {
        return products;
    }

    static addProduct(name, desc, imageUrl, category, price, size) {
        const newProduct = new ProductModel(name, desc, imageUrl, category, price, size);
        products.push(newProduct);
        return newProduct;
    }

    static getOne(id) {
        const result = products.find((u) => u.id == id);
        return result;
    }

    static filterProdcut(minPrice, maxPrice, category) {
        const result = products.filter((u) => minPrice < u.price && maxPrice > u.price && category == u.category);
        return result;
    }

    static rateProduct(userId, productId, rating) {
        //* user authentication user exist or not
        const userExist = UserModel.getAll().find(i => i.id === userId);
        if (!userExist) {
            return "Unauthorized user.";
        }
        // * prodcuct authentication product exist or not
        const productExistIndex = products.findIndex(i => i.id === productId);
        if (productExistIndex === -1) {
            return 'Undefined product.';
        }
             

        // * get the product
        const productExist = products[productExistIndex];
        
        if (!productExist.ratings) {
            productExist.ratings = [];
        }

        //* check user alredy gives the rating or not
        const existingRatingIndex = productExist.ratings.findIndex(r => r.userId === userId);
        if (existingRatingIndex >= 0) {
            productExist.ratings[existingRatingIndex].rating = rating ;
        } else {
            productExist.ratings.push({ userId: userId, rating: rating });
        }
    }

}

let products = [{

    "id": 1,
    "name": "Classic Cotton T-Shirt",
    "desc": "A soft, breathable cotton t-shirt perfect for everyday wear.",
    "imageUrl": "https://picsum.photos/seed/tshirt1/300/300",
    "category": "clothing",
    "price": 19.99,
    "size": ["M", "L", "XL"]
},
{
    "id": 2,
    "name": "Denim Jeans",
    "desc": "Slim-fit denim jeans made with stretch fabric for added comfort.",
    "imageUrl": "https://picsum.photos/seed/jeans1/300/300",
    "category": "clothing",
    "price": 49.99,
    "size": ["M", "L", "XL"]
},
{
    "id": 3,
    "name": "Sport Running Shoes",
    "desc": "Lightweight and breathable running shoes designed for performance.",
    "imageUrl": "https://picsum.photos/seed/shoes1/300/300",
    "category": "Footwear",
    "price": 74.99,
    "size": ["M", "L", "XL"]
},
{
    "id": 4,
    "name": "Leather Wallet",
    "desc": "Premium leather wallet with multiple card slots and a coin pocket.",
    "imageUrl": "https://picsum.photos/seed/wallet1/300/300",
    "category": "Accessories",
    "price": 29.99,
    "size": ["M", "L", "XL"]
},
{
    "id": 5,
    "name": "Hooded Sweatshirt",
    "desc": "Cozy fleece hoodie for cool weather comfort and style.",
    "imageUrl": "https://picsum.photos/seed/hoodie1/300/300",
    "category": "Clothing",
    "price": 39.99,
    "size": ["M", "L", "XL"]
}
];

module.exports = ProductModel;