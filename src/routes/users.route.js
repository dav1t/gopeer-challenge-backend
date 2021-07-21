const express = require("express");
const router = express.Router();
const UserController = require('../controller/user.controller')

const userController = new UserController();

router.post("/", async (req, res, next) => {
    try {
        const user = await userController.registerUser(req.body);
        const token = user.generateAuthToken();
        
        res.header("x-auth-token", token).send({
            _id: user._id,
            name: user.name
        });
    } catch (e) {
        next(e);
    }
});

module.exports = router;