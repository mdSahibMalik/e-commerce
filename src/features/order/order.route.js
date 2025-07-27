const express = require('express');
const OrderController = require('./order.controller');
const orderRouter = express.Router();
const orderController = new OrderController()

orderRouter.get("/", (req, res)=>{
    orderController.createOrder(req, res);
})

module.exports = orderRouter;