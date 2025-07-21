const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const UserModel = require("./user.model.js");
const UserRepository = require("./user.repository.js");
//* we are creating constructor  in constructon we are create instance of userRepository with this keyword 
class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res) {
        try {
        const { name, email, password, type } = req.body;
        //* bcrypt the password 
        const hashedPassword = await bcrypt.hash(password , 12);
        //* we are creating a instance of UserModel with some properties like anme email password and type 
        const user = new UserModel(name, email, hashedPassword, type);
        //* we are passing our user instance in userRepository in signup method 
        await this.userRepository.signUp(user);
        if (user) {
           return res.status(201).send(user);
        }
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const userExist = await this.userRepository.findByEmail(email);
            if(!userExist){
                return res.status(401).send("Invalid Crediential");
            }else{
                const result = await bcrypt.compare(password, userExist.password);
                if(!result){
                    return res.status(401).send("Invalid Crediential");
                }else{
                    const token = jwt.sign({ userId: userExist._id, userEmail: userExist.email }, 'p5DbhaksRiuQN2K8tSEKqOrqcfjPWt1D', { expiresIn: '1h' });
                //2. send token
                return res.status(200).send(token );
                }
            }
        } catch (error) {
            console.log(error);
        }

    }
    getAll(req, res) {

        const allUsers = UserModel.getAll();
        res.status(200).send(allUsers);
    }
}
module.exports = UserController;