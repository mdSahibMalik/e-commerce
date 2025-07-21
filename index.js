const express = require('express');
const app = express();
const cors = require('cors');
const productRouter = require('./src/features/product/product.route.js');
const userRouter = require('./src/features/user/user.route.js');
const cartRouter = require('./src/features/cart/cart.route.js');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const jwtAuth = require('./src/middleware/authJWT.middleware.js');
const logerMiddlware = require('./src/middleware/logger.middleware.js');
const {mongoConnection} = require('./src/middleware/connection.js');


// app.get('/', (req, res)=>{
//     res.send('this is apis page');
// })


// api user routes
app.use('/api/users',logerMiddlware,userRouter);


// api product routes
app.use('/api/product',logerMiddlware,jwtAuth,productRouter);

//* api for cart 
app.use('/api/cart',logerMiddlware,jwtAuth, cartRouter);

//* if any api does not mathed
app.use((req,res)=>{
    res.status(400).send("Something went wrong try again after some time");
})

app.listen(3200,(req, res)=>{
    console.log('server run at port 3200.. ');
    mongoConnection();
})