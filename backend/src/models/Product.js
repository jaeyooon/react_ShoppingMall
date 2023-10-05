const mongoose = require('mongoose');

const productSchema = mongoose.Schema({    // 스키마 생성
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxLength: 30
    },
    description: String,
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxLength: 100,
        default: 0
    },
    continents: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true }) 

const Product = mongoose.model("Product", productSchema);    // 스키마 이용해서 Model 생성

module.exports = Product; 