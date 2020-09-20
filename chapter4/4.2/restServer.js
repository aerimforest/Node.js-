const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http.createServer(async(req, res) => {
    try {
        console.log(req.method, req.url);
        if(req.method === 'GET') {
            if(req.url === '/') {
                const data = await fs.readFile('./restFront.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data);
            } else if(req.url === '/about') {
                const data = await fs.readFile('./about.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                return res.end(data);
            } else if(req.url === '/users') {
                res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }

            // 주소가 /도 /about도 /users도 아니면
            try {
                const data = await fs.readFile('.${req.url}');
                return res.end(data);
            } catch(err) {
                // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
            }
        } else if(req.method === 'POST') {
            if(req.url === '/user') { // 사용자를 새로 저장
                let body = '';

                // 요청의 body를 stream 형식으로 받음
                req.on('data', (data) => {
                    body += data;
                });

                // 요청의 body를 다 받은 후 실행됨
                return req.on('end', () => {
                    console.log('POST 본문(Body):', body);
                    const {name} = JSON.parse(body); // 받은 데이터가 문자열이므로 JSON으로 만들어줘야 함
                    const id = Date.now();
                    users[id] = name;
                    res.writeHead(201);
                    res.end('등록 성공');
                });
            }
        } else if(req.method === 'PUT') {
            if(req.url.startsWith('/user/')) { // 해당 아이디의 사용자 데이터 수정
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                return req.on('end', () => {
                    console.log('PUT 본문(Body):', body);
                    users[key] = JSON.parse(body).name; // 받은 데이터가 문자열이므로 JSON으로 만들어줘야 함
                    return res.end(JSON.stringify(users));
                });
            }
        } else if(req.method === 'DELETE') {
            if(req.url.startsWith('/user/')) { // 해당 아이디의 사용자 제거
                const key = req.url.split('/')[2];
                delete users[key];
                return res.end(JSON.stringify(users));
            }
        }
        // 존재하지 않는 파일을 요청했거나 GET 메서드 요청이 아닌 경우
        res.writeHead(404);
        return res.end('Not Found');
    } catch(err) { // 응답 과정에서 예기치 못한 에러가 발생한 경우
        console.error(err);
        res.writeHead(500);
        res.end(err);
    }
}).listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
});