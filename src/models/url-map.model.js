const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const UrlMapSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    shortened: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    }
}, {timestamps: true});

const UrlMap = mongoose.model('UrlMap', UrlMapSchema);

exports.UrlMap = UrlMap;