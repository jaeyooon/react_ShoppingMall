const jwt = require('jsonwebtoken');
const User = require('../models/User');

let auth = async (req, res, next) => {

    // 토큰을 Request Headers에서 가져오기
    const authHeader = req.headers['authorization'];

    // Bearer accessToken
    const token = authHeader && authHeader.split(' ')[1];   // accessToken 정보만 가져오기
    if(token == null) return res.sendStatus(401);

    try {
        // 토큰이 유효한 토큰인지 확인
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ "_id": decode.userId });   // 해당 userId의 유저 정보를 DB에서 가져옴.
        if(!user) {
            return res.status(400).send('존재하지 않는 유저입니다.')
        }

        req.user = user;
        next();     // 미들웨어에서 벗어남.
    } catch (error) {
        next(error);
    }
}

module.exports = auth;