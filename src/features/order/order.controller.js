const OrderRepository = require("./order.repository");
const jwtAuth = require('../../middleware/authJWT.middleware.js')


class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository();
    }

    async createOrder(req, res){
        try {
            const userId = req.userId;
            const result = await this.orderRepository.createOrder(userId);
            // console.log(result);
            return res.status(201).send('order created success');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = OrderController;