const { Router } = require("express");
const {Admin, User} = require("../db");
const jwt = require("jsonwebtoken");
const {secret} = require("../config");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        msg: "Admin created successfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.find({username, password});
    if(user) {
        const token = jwt.sign({username}, secret);
        res.json({
            token
        })
    }
    else{
        res.status(411).json({
            msg: "Incorrect credentials"
        })
    }
    
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;