const jwt = require('jsonwebtoken');
const {secret} = require("../config");
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const auth = req.headers.authorization;
    const words = auth.split(" ");
    const token = words[1];
    const verified = jwt.verify(token, secret);
    if(verified.username) {
        next();
    }
    else {
        res.json({
        msg: "You are not authorized"
    })
    }
}

module.exports = userMiddleware;