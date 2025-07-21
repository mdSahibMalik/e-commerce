const {getdb} = require("../../middleware/connection.js");
class UserRepository {

    async signUp(newUser) {
        try {
            const db = getdb();

            const collection = db.collection('users');
            await collection.insertOne(newUser);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    }

     async signIn(email, password) {
        try {
            const db = getdb();

            const collection = db.collection('users');
            //* find the user
            return await collection.findOne({email, password});
        } catch (error) {
            console.log(error);
        }
    }

    async findByEmail(email){
         try {
            const db = getdb();

            const collection = db.collection('users');
            //* find the user
            return await collection.findOne({email});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserRepository;