const express = require('express');     // Express 모듈 불러오기
const path = require('path');
const app = express(); // 새로운 Express App 생성
const cors = require('cors');
const port = 4000;  // Express 서버를 위한 포트 설정
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());    // JSON 형태의 요청 body를 파싱하기 위해 express.json() 미들웨어를 사용

mongoose.connect(process.env.MONGO_URI) // 환경변수 이용
    .then(() => {
        console.log('연결 완료');
    })
    .catch(err => {
        console.error(err);
    })

app.get('/', (req, res, next) => {    // Client에서 해당 경로로 요청을 보내면 req 객체와 res 객체를 받아오는데 
    setImmediate(() => { next(new Error('it is an error'))});
    //res.send('안녕하세요:-)');  // 응답을 이렇게 주겠다는 의미
})    

app.post('/', (req, res) => {    
    console.log(req.body);
    res.json(req.body);
})    

app.use('/users', require('./routes/users'))    // ✨ /users 경로로 요청을 들어오면 ./routes/users 로 전달해줌

app.use((error, req, res, next) => {    // 에러 처리기
    res.status(err.status || 500);
    res.send(error.message || '서버에서 에러가 났습니다.');
})

app.use(express.static(path.join(__dirname, '../uploads')));    // express app에 미들웨어 등록, uploads 폴더에서 이미지, CSS 파일 및 자바스크립트 파일 제공

app.listen(port, () => {    // listen 메소드를 이용해서 Express App 실행
    console.log(`${port}번에서 실행이 되었습니다.`);
}); 