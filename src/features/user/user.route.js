const express = require('express');
const userRouter = express.Router();
const UserController = require('./user.controller.js');
const userController = new UserController();


userRouter.get('/getusers',userController.getAll)

// user login
userRouter.post('/signin', (req, res )=>{
    userController.signIn(req, res);
})

// user registration
userRouter.post('/signup',(req, res )=>{
    userController.signUp(req, res);
});

module.exports = userRouter;