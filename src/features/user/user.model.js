const { getdb } = require('../../middleware/connection.js');
class UserModel {
    constructor(name, email, password, type) {

        this.name = name,
            this.email = email,
            this.password = password,
            this.type = type
    }

//! --------------------------------------------------------------------------------------------
//! this whole code commented regarding repsository pattern 

    // sign up users
    // static async signUp(name, email, password, type) {
    //     try {
    //         const db = getdb();

    //         const collection = db.collection('users');
    //         const newUser = new UserModel(name, email, password, type);
    //        await collection.insertOne(newUser);
    //         return newUser;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // sign in users
    // static signIn(email, password) {
    //     const userExist = users.find((u) => u.email === email && u.password === password);
    //     return userExist;
    // }
    // static getAll() {
    //     return users;
    // }
//!------------------------------------------------------------------------------------------------------
}

let users = [{
    "id": 1,
    "name": "ms malik",
    "email": "ms@gmail.com",
    "password": "Pass12",
    "type": "seller"
},
{
    "id": 2,
    "name": "ms",
    "email": "cutomer@gmail.com",
    "password": "Pass12",
    "type": "customer"
}]

module.exports = UserModel;