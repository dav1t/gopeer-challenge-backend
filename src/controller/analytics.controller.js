const { UrlMap } = require("../models/url-map.model")
const { UrlVisit } = require("../models/url-visit.model")
var ObjectId = require('mongoose').Types.ObjectId; 

class AnalyticsController {
    async getUserAnalytics(userId) {
        const urlMaps = await UrlMap.find({userId: new ObjectId(userId)});
        
        const urls = urlMaps.map(urlMap => urlMap.shortened);
        const mapIds = urlMaps.map(urlMap => urlMap._id);

        const [uniqueVisitors] = await UrlVisit.aggregate([{
            $match: {
                urlMapId: {
                    $in: mapIds
                }
            }
        },
        {
            $group: {
                _id: null,
                distinctValues: { $addToSet: "$userId" }
            }
        },
        { $project: { _id: 0, total: {$size: "$distinctValues"} } }])
        
        const total = await UrlVisit.countDocuments({urlMapId: {$in: mapIds}});

        return {
            urls,
            unique: uniqueVisitors ? uniqueVisitors.total : 0,
            total,
        }
    }

    async getUrlAnalytics(url) {
        const urlMap = await UrlMap.findOne({
            shortened: url
        })

        if (!urlMap) {
            throw new Error("Cant find url");
        }

        const [uniqueVisitors] = await UrlVisit.aggregate([
            {
                $match: {
                    urlMapId: new ObjectId(urlMap._id)
                }
            },
            {
                $group: {
                    _id: null,
                    distinctValues: { $addToSet: "$userId" }
                }
            },
            { $project: { _id: 0, total: {$size: "$distinctValues"} } }
        ]);

        const total = await UrlVisit.countDocuments({urlMapId: new ObjectId(urlMap._id)});

        return {
            unique: uniqueVisitors.total, 
            total
        };
    }
}

module.exports = AnalyticsController;