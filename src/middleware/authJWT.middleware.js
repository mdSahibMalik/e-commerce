const jwt = require('jsonwebtoken');
const jwtAuth = (req, res, next) => {

    //1. read the token
    const authToken = req.headers['authorization'];

    //2. if no token, return the error 
    if (!authToken) {
        return res.status(401).send('No authorization found..');
    }

    //3. check if token is valid
    try {
        const tokenValid = jwt.verify(authToken, 'p5DbhaksRiuQN2K8tSEKqOrqcfjPWt1D');
        // console.log("decode JWT : ", tokenValid);
        req.userId = tokenValid.userId;
        //5. call next middleware.
        next();
    } catch (error) {
        //4. return the error
        return res.status(401).send("Unauthorized");
    }
    

}

module.exports = jwtAuth;