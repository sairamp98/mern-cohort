// Middleware for handling auth
const jwt = require("jsonwebtoken");
const {secret} = require("../config")
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const auth = req.headers.authorization;
    const words = auth.split(" ");
    const token = words[1];
    const verified = jwt.verify(token, secret);
    if(verified.username) {
        next();
    }
    else {
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }
}

module.exports = adminMiddleware;