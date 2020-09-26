const express = require('express');
const path = require('path');

// 익스프레스 내부에 http 모듈 내장되어있음 -> 서버 역할 가능
// express 모듈을 실행해 app 변수에 할당
const app = express(); 

// app.set('port', 포트);
// 서버가 실행될 포트 설정
// process.env 객체에 PORT 속성이 있는 경우 그 값을 사용, 없다면 3000번 포트를 사용!
app.set('port', process.env.PORT || 3000); 

// app.get(주소, 라우터);
// 주소에 대한 GET 요청이 들어올 때 어떤 동작을 할지 결정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html')); 
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});