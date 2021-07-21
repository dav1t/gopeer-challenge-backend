const express = require("express");
const router = express.Router();
const AnalyticsController = require('../controller/analytics.controller');

const analyticsController = new AnalyticsController();

router.get("/url", async (req, res, next) => {
    try {
        const url = req.query.url;

        const result = await analyticsController.getUrlAnalytics(url);
       
        res.send(result);
    } catch (e) {
        next(e);
    }
});

router.get("/user", async (req, res, next) => {
    try {
        const user = req.user;

        const result = await analyticsController.getUserAnalytics(user._id);
       
        res.send(result);
    } catch (e) {
        next(e);
    }
});

module.exports = router;