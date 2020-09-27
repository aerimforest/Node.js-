const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config(); // 현재 디렉토리의 .env 파일을 자동으로 읽어서 process.env로 만듦 -> 보안 good

// 익스프레스 내부에 http 모듈 내장되어있음 -> 서버 역할 가능
// express 모듈을 실행해 app 변수에 할당
const app = express(); 

// app.set('port', 포트);
// 서버가 실행될 포트 설정
// process.env 객체에 PORT 속성이 있는 경우 그 값을 사용, 없다면 3000번 포트를 사용!
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false})); // true : qs, false : queryString 모듈 사용
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

const multer = require('multer');
const fs = require('fs');

try {
    fs.readdirSync('uploads');
} catch(error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) { // 어디에 업로드 할지
            done(null, 'uploads/'); // done(에러가 났을 때 동작, 성공했을 때 동작)
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); // 확장자 추출
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 어떤 이름으로 올릴지
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 업로드 할 파일의 최대 크기를 5MB로 제한
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
  });
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('ok');
});

app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
}, (req, res) => { // app.get('/')의 두 번째 미들웨어, 여기서 에러 발생 -> 아래의 에러 처리 미들웨어에 전달
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

// 에러 처리 미들웨어(매개변수는 반드시 4개여야 함)
// 가능하면 에러 처리 미들웨어는 가장 아래에 위치하도록 작성
app.use((err, req, res, next) => {
    console.error(err);

    // res.send() -> http 서버에서 사용했던 아래의 두 줄을 express에서 대신할 수 있는 코드
    // res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    // res.end('<p>Hello Server!</p>');
    // express에서 writeHead, end는 가능하면 사용하지 말 것
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => { 
    console.log(app.get('port'), '번 포트에서 대기 중');
});