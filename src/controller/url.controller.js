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

    async shortenUrl(url, userId) {
        // taking milliseconds from 1970 and subtracting years
        const uniqueNumber = Date.now() - (31556952000 * (new Date().getFullYear() - 1970));
        const shortened = this.convertDecToAlphaNum(uniqueNumber);
        
        const urlExists = await UrlMap.findOne({shortened});

        if(urlExists) {

            // if Url Exists and its not created more than half year ago retrying shortening, else Deleting and creating new instead.
            if(urlExists.createdDate.getTime() - Date.now() < (31556952000 / 2)) {
                return this.shortenUrl(url, userId);
            } else {
                UrlMap.findByIdAndDelete(urlExists._id);
                return await new UrlMap({
                    url,
                    shortened,
                    userId
                }).save();
            }

        } else {
            return await new UrlMap({
                url,
                shortened,
                userId
            }).save();
        }
    }

    // Converts Decimal number to AlphaNumeric Number
    convertDecToAlphaNum(number) {
        const symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        let result = '';

        while (number > 0) {
            result += symbols[number % 62];
            number =Math.floor(number/62); 62
        }
        return result;
    }
}

module.exports = UrlController;
