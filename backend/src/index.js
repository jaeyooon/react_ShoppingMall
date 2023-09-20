const express = require('express');     // Express 모듈 불러오기
const path = require('path');
const app = express(); // 새로운 Express App 생성
const cors = require('cors');
const port = 4000;  // Express 서버를 위한 포트 설정

app.use(cors());
app.use(express.json());    // JSON 형태의 요청 body를 파싱하기 위해 express.json() 미들웨어를 사용

app.get('/', (req, res) => {    // Client에서 해당 경로로 요청을 보내면 req 객체와 res 객체를 받아오는데 
    res.send('안녕하세요:-)');  // 응답을 이렇게 주겠다는 의미
})    

app.post('/', (req, res) => {    
    console.log(req.body);
    res.json(req.body);
})    

app.use(express.static(path.join(__dirname, '../uploads')));    // express app에 미들웨어 등록, uploads 폴더에서 이미지, CSS 파일 및 자바스크립트 파일 제공

app.listen(port, () => {    // listen 메소드를 이용해서 Express App 실행
    console.log(`${port}번에서 실행이 되었습니다.`);
}); 