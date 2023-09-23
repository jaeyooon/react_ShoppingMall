const mongoose = require('mongoose');

const userSchema = mongoose.Schema({    // 스키마 생성
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true, // 공백을 없애줌
        unique: true
    },
    password: {
        type: String,
        minLength: 5
    },
    role: {
        type: Number,
        default: 0  // 일반유저 : 0, Admin 유저 : 1
    },
    image: String
})

const User = mongoose.model("User", userSchema);    // 스키마 이용해서 Model 생성

module.exports = User;