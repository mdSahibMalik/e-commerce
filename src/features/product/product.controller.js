const ProductModel = require('./product.model.js');
const ProductRepository = require('./product.repository.js');

class ProductController {
    constructor() {
        this.productRepository = new ProductRepository();
    }
    //! ----------------------------------------------------------------------------------
    // createProduct(req, res) {
    //     const { name, desc, imageUrl, category, price, size } = req.body;
    //     const result = ProductModel.addProduct(name, desc, imageUrl, category, price, size);
    //     res.status(201).send(result);
    // }

    //* with Product repository 

    async createProduct(req, res) {
        try {
            const { name, desc, imageUrl, category,stock, price, size } = req.body;
            const newProduct = new ProductModel(name, desc, imageUrl, category, price, stock, size);
            const result = await this.productRepository.addProduct(newProduct);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("something went wrong");
        }
    }

    //!--------------------------------------------------------------------------
    // getAll(req, res) {
    //     const allProducts = ProductModel.getAll();
    //     res.status(200).send(allProducts);
    // }

    async getAll(req, res) {
        try {
            const products = await this.productRepository.getAll();
            res.status(201).send(products);
        } catch (error) {
            console.log(error);
        }

    }

    //!------------------------------------------------------------------------------------------------------------
    // getOne(req, res) {
    //     const id = req.params.id;
    //     const result = ProductModel.getOne(id);
    //     if (!result) {
    //         return res.status(404).send("product not found..");
    //     }
    //     res.status(200).send(result);
    // }

    async getOne(req, res) {
        try {
            const id = req.params.id;
            const result = await this.productRepository.getOne(id);
            if (!result) {
                return res.status(401).send("product not found")
            }
            return res.status(201).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("something went wrong")
        }

    }

    //!--------------------------------------------------------------------------
    //* filter product using product repository

    async filterProduct(req, res) {
        try {
            const { minPrice, maxPrice, category } = req.body;
            const result = await this.productRepository.filterProduct(minPrice, maxPrice, category);
            if (result.length === 0) {
                return res.status(404).send({ message: "product not found" })
            }
            return res.status(200).send(result);

        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }

    }




    // filterProduct(req, res) {
    //     const { minPrice, maxPrice, category } = req.query;

    //     const result = ProductModel.filterProdcut(minPrice, maxPrice, category);
    //     if (result.length === 0) {
    //         return res.status(404).send({ message: "product not found" })
    //     }
    //     res.status(200).send(result);
    // }


    //!---------------------------------------------------------------------------
    //* addRating using product repository 

    async addRating(req, res) {
        try {
            const { productId, rating } = req.body;
            const userId = req.userId;
            const result = await this.productRepository.addRating(userId, productId, rating);
            if (!result) {
                return res.status(500).send("Product not found or rating not added");
            }else{
                return res.status(201).send("rating has been added");
            }
        } catch (error) {
            console.log(error);
            res.status(400).send('something went wrong');
        }
    }




    // addRating(req, res) {
    //     const { userId, productId, rating } = req.body;
    //     const error = ProductModel.rateProduct(userId, productId, rating);
    //     if (!error) {
    //         res.status(201).send('Rating added successful.');
    //     } else {
    //         res.status(401).send(error);
    //     }
    // }

}

module.exports = ProductController;