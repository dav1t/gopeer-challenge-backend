const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const UrlVisitSchema = new Schema({
    urlMapId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    }
}, {timestamps: true});

const UrlVisit = mongoose.model('UrlVisit', UrlVisitSchema);

exports.UrlVisit = UrlVisit;