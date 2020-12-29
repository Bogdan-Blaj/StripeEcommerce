const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: 1,
        maxlength : 100
    },
    description : {
        type: String,
        required: true,
        maxlength : 100000
    },
    price : {
        type: Number,
        required : true,
        maxlength : 255
    },
    type : {
        type: Schema.Types.ObjectId,
        ref : 'Type',
        required : true
    },
    category : [{
        type: Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    }],
    platform : [{
        type: Schema.Types.ObjectId,
        ref : 'Platform',
        required : true
    }],
    sold : {
        type: Number,
        maxlength : 100,
        default: 0
    },
    images:{
        type: Array,
        default:[]
    }
},{timestamps: true});

const Product = mongoose.model('Product', productSchema);
module.exports = { Product }