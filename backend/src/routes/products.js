const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')    // uploads 폴더에 이미지 저장
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).single('file')

router.post('/image',auth, async (req, res, next) => {    
    upload(req, res, err => {
        if(err) {
            return req.status(500).send(err);   // 서버 에러 500
        }
        return res.json({ fileName: res.req.file.filename });   // 프론트엔드에 파일 이름 전달
    })
})    


router.post('/',auth, async (req, res, next) => {    // 로그인이 된 사람만 상품 업로드 가능하도록 해야하므로 auth middleware 필요
    try {
        const product = new Product(req.body);    // 객체 생성
        product.save();     // save 메서드를 통해 DB에 저장
        return res.sendStatus(201);
    } catch (error) {
        next(error);    // 에러처리기로 에러 보내줌.
    }
})    


module.exports = router;