const UserModel = require("../features/user/user.model.js");



const basicAuth = (req, res, next) =>{

    //1. get headers from client
    const authenticationHeader = req.headers["authorization"];
    
    //2. check header is present or not
    if(!authenticationHeader){
       return res.status(401).send("No authorization found..");
    }

    //3. replace the Basic  to empty bcz headers give us <= Basic bXMxQGdtYWlsLmNvbToxMjM0  => this data
    const bash64Credientials = authenticationHeader.replace('Basic ', '');

    //4. decode the credientials <= this data bXMxQGdtYWlsLmNvbToxMjM0 =>
    const decode = Buffer.from(bash64Credientials, 'base64').toString('utf8');
    
    //5. split the deoode credientials // convert into string like this <= email:password => to email and password
    const cred = decode.split(':');

    //6. after 5. operation this give us to data in array form like this <= cred[email, password] =>
    const userExist = UserModel.getAll().find((u) => u.email === cred[0] && u.password === cred[1]);
    if(userExist){
        next();
    }else{
        res.status(401).send("Invalid credencial");
    }

    
}
module.exports = basicAuth;