var mongoose = require('mongoose');

var SaltSchema = mongoose.Schema({
    entityID:  { type: String, required: true, unique: true },
    username:  { type: String, required: true, unique: true }, // Rest: name without space
});s

module.exports = mongoose.model('Salt',  SaltSchema);