const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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


// ✨스키마 생성 후 모델을 만들기 때문에 꼭 이 위치에 코드 작성!  
userSchema.pre('save', async function(next) {
   let user = this;     // 회원가입 하고자 하는 유저의 정보가 들어가있음.

   if(user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);   // salt 생성
        const hash = await bcrypt.hash(user.password, salt);    // plain password를 salt와 함께 해시해줌.
        user.password = hash;   // 해시된 비밀번호를 넣어줌.
    }

    // 이 미들웨어에서 다 처리한 다음에 넘어가기 위해선 next() 호출해줘야 함.
    next();
})


const User = mongoose.model("User", userSchema);    // 스키마 이용해서 Model 생성

module.exports = User;