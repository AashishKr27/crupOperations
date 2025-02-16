const mongoose = require("mongoose");
mongoose.connect("mongodb://Localhost:27017/crud-operation");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    image: String,
});

module.exports = mongoose.model("user", userSchema);