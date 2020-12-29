const mongoose = require('mongoose');

const platformSchema = mongoose.Schema({
    name : {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
});

const Platform = mongoose.model('Platform', platformSchema);
module.exports = { Platform }
