const { error } = require('console');
const http = require('http');

// 한번에 2개의 서버 실행(createServer를 원하는 만큼 호출하면 됨)

http.createServer((req, res) => {
    // 200 : 성공적인 요청
    // utf-8 : 한글 표시
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});

    // wirte의 첫번째 인수는 클라이언트로 보낼 데이터
    res.write('<h1>Hello Node!</h1>');

    // 인수를 클라이언트로 보내고 응답 종료
    res.end('<p>Hello Server!</p>');
}).listen(8080, () => { // 서버 연결(콜백 함수 사용)
    console.log('8080번 포트에서 서버 대기 중입니다!');
});

http.createServer((req, res) => {
    // 200 : 성공적인 요청
    // utf-8 : 한글 표시
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});

    // wirte의 첫번째 인수는 클라이언트로 보낼 데이터
    res.write('<h1>Hello Node!</h1>');

    // 인수를 클라이언트로 보내고 응답 종료
    res.end('<p>Hello Server!</p>');
}).listen(8081, () => { // 위의 서버와 포트 번호가 달라야 함에 주의!
    console.log('8081번 포트에서 서버 대기 중입니다!');
});

