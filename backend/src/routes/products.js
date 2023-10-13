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


router.get('/', async (req, res, next) => {    // 데이터를 가져오는 것이므로 get 요청
    // asc 오름차순, desc 내림차순
    const order = req.query.order ? req.query.order : 'desc';   // 상품 정렬 옵션-내림차순 or 오름차순 (localhost:4000/product?order=desc)
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';   // _id를 이용해서 정렬
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const term = req.query.searchTerm;

    let findArgs = {};  // 객체
    for (let key in req.query.filters) {     // filters의 key ===> continents 또는 prices
        if (req.query.filters[key].length > 0) {     // 체크박스(continents)나 라디오박스(price)에 체크된 것이 있을 경우
            if (key === 'price') {
                findArgs[key] = {
                    // Greater than equal
                    $gte: req.query.filters[key][0],
                    // Less than equal
                    $lte: req.query.filters[key][1]
                }
                
            } else {
                findArgs[key] = req.query.filters[key]; 
            }              
        }
    }

    if(term) {
        findArgs["$text"] = { $search: term };
    }

    console.log(findArgs);
    
    try {
        const products = await Product.find(findArgs)   // findArgs를 통해 필터링 된 데이터만 가져올 수 있게 됨.
        .populate('writer')     // populate을 통해 해당 writer의 모든 정보를 가져올 수 있음
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)

        const productsTotal = await Product.countDocuments(findArgs);   // MongoDB에서 document 는 row, findArg로 조건을 줘서 더보기 버튼 표시 유무 결정
        const hasMore = skip + limit < productsTotal ? true : false;
   
        return res.status(200).json({
            products,    // Client에 products를 보내줌.
            hasMore     // Clinet에 hasMore 보내줌으로서 더보기 버튼 표시 유무 결정
        })

    } catch (error) {
        next(error);   
    }
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