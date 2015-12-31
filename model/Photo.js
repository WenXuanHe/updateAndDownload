var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/photo_app");
var schema =new mongoose.Schema({
    name:String,
    path:String,
    type:String
});
module.exports= mongoose.model("photo", schema);