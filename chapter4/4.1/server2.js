const { error } = require('console');
const http = require('http');
const fs = require('fs').promises; // html 파일 읽음

http.createServer(async(req, res) => {
    try{
        const data = await fs.readFile('./server2.html');
        // 200 : 성공적인 요청
        // utf-8 : 한글 표시
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});

        // 인수를 클라이언트로 보내고 응답 종료
        res.end(data);
    } catch(err) {
        console.log(err);
        // text/plain : 일반 문자열
        // 500(HTTP 상태 코드) : 서버 오류
        res.writeHead(500, {'Content-Type' : 'text/plain; charset-utf-8'});
        res.end(err.message);
    }
}).listen(8081, () => { // 서버 연결(콜백 함수 사용)
    console.log('8081번 포트에서 서버 대기 중입니다!');
});