const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const UserController = require('../controller/user.controller')

const userController = new UserController();

router.get("/current", auth, async (req, res, next) => {
    try {
        const user = await userController.getUser(req.body.id);

        res.send(user);
    } catch (e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const user = await userController.registerUser(req.body);
        const token = user.generateAuthToken();
        
        res.header("x-auth-token", token).send({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (e) {
        next(e);
    }
});

module.exports = router;