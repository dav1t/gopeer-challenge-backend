const express = require("express");
const router = express.Router();
const AuthController = require('../controller/auth.controller');

const authController = new AuthController();

router.post("/login", async (req, res, next) => {
    try {
        const user = req.body;
        const token = await authController.authUser(user);
        
        console.log(token);

        res.set("Access-Control-Expose-Headers", "x-auth-token");
        res.set("x-auth-token", token).send({
            _id: user._id,
            name: user.name,
        })
    } catch (e) {
        next(e);
    }
});

module.exports = router;