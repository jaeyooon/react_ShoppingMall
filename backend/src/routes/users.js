const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res, next) => {    
    // MongoDB에 유저 데이터 저장(Model 이용)
    try {
        const user = new User(req.body);
        await user.save();  // 비동기 요청을 보내고 유저 정보가 저장될 때까지 기다림.
        return res.sendStatus(200);
    } catch (error) {
        next(error);    // error와 함께 에러 처리기에 보내줌.
    }

})    

module.exports = router;