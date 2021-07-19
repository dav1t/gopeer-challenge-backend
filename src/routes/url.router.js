const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const url = req.body.url;
        console.log(req.user, url);
        res.send('dradada');
    } catch (e) {
        next(e);
    }
});

module.exports = router;