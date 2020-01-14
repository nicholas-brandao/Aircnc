const mongoose = require("mongoose");
const Ipconfig = require('../config/ipConfig');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    toJSON: {
        virtuals: true
    }
});

SpotSchema.virtual('thumbnail_url').get(function(){
    if(this.thumbnail)
    return `${Ipconfig.Ip}/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Spot", SpotSchema);