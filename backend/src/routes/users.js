const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.get('/auth',auth, async (req, res, next) => {    
    
    return res.json({   // 미들웨어를 통해 가져온 인증이 되어있는 유저의 데이터를 client에 보내줌.
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
    })
})    


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


router.post('/login', async (req, res, next) => {    
    // MongoDB에 유저 데이터 저장(Model 이용)
    try {
        // 존재하는 유저인지 체크
        const user = await User.findOne({ email: req.body.email });    
        
        if(!user) {
            return res.status(400).send("Auth failed, email not found");
        }

        // 비밀번호가 올바른 것인지 체크
        const isMatch = await user.comparePassword(req.body.password);  // plainPassword 123456
        if(!isMatch) {
            return res.status(400).send('Wrong password!');
        } else {
            console.log('success');
        }

        const payload = {
            userId: user._id.toHexString(),  // MongoDB의 id는 objectId로 되어있기 때문에 String 값으로 변경
        }

        // token 생성
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })  // 토큰 유효기간 -> 1시간

        return res.json({ user, accessToken });     // 유저정보와 Token을 Client에 전달

    } catch (error) {
        next(error);    // error와 함께 에러 처리기에 보내줌.
    }

})  


router.post('/logout', auth, async (req, res, next) => {    
    // auth 미들웨어를 통과하면 올바른 유저인것 (auth에서 유효한 토큰인지 여부 체크)
    try {
        return res.sendStatus(200);
    } catch (error) {
        next(error);    // error와 함께 에러 처리기에 보내줌.
    }

})    


module.exports = router;