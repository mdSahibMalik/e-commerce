const express = require('express');
const ProductController = require('./product.controller.js');
// use middleware jwtAuth or basicAuth as u wish
// const basicAuth = require('../../middleware/basicAuth.middleware.js');
// const jwtAuth = require('../../middleware/authJWT.middleware.js');
const productRouter = express.Router();
const productController = new ProductController();

productRouter.use(express.json());

// ?get all the products..
productRouter.get('/', (req, res)=>{
    productController.getAll(req, res);
});

// *add a produnct by post method...
productRouter.post('/add',(req, res)=>{
    productController.createProduct(req, res);
});

// !get one product using params
productRouter.get('/getone/:id', (req, res)=>{
    productController.getOne(req, res);
});

// get filtered product 
productRouter.get('/filter', (req, res)=>{
    productController.filterProduct(req, res);
});

// rate product 
productRouter.post('/rate',(req, res)=>{
    productController.addRating(req, res);
});


module.exports = productRouter;