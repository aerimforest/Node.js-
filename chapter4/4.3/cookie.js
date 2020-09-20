const http = require('http');

http.createServer((req, res) => {
    // req.headers.cookie에 쿠키가 들어있음
    console.log(req.url, req.headers.cookie);

    // 응답의 header에 쿠키 기록
    // Set-Cookie : 브라우저에게 "다음과 같은 쿠키 저장해~"
    // 응답을 받은 브라우저는 mycookie=test라는 쿠키 저장 
    res.writeHead(200, {'Set-Cookie' : 'mycookie=test'});
    res.end('Hello Cookie');
}).listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
});