const express = require("express");
const router = express.Router();
const UrlController = require('../controller/url.controller');

const urlController = new UrlController();

router.post("/", async (req, res, next) => {
    try {
        const url = req.body.url;
        const user = req.user;
        console.log(url);

        const result = await urlController.shortenUrl(url, user._id);
        res.send(result);
    } catch (e) {
        next(e);
    }
});

module.exports = router;