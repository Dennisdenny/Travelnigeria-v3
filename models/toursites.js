var mongoose = require("mongoose");

var toursitesSchema = new mongoose.Schema({
    name:String,
    img:String,
    desc:String,
    comments:[ {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
    }
         ]
});

module.exports = mongoose.model("Toursite", toursitesSchema);