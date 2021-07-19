const { UrlVisit } = require("../models/url-visit.model");
const { UrlMap } = require("../models/url-map.model");

class UrlController {
    async getFullUrl(shortened) {
        return await UrlMap.findOne({
            shortened
        });
    }
    
    async createUrlVisit(mapId, userId) {
        new UrlVisit({
            urlMapId: mapId,
            userId
        }).save();
    }
}

module.exports = UrlController;
