const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

/* 1. (10 ~ 17) 
    - 쿠키는 mycookie=test와 같은 문자열
    - 이를 쉽게 사용하기 위해 자바스크립트 객체 형식으로 바꾸는 함수
    - 함수 거친 후 결과 : { mycookie: 'test' } */ 
const parseCookies = (cookie = '') => 
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer(async(req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    /* 2.(27 ~ 39) 
        - 주소가 login으로 시작하는 경우, url과 querystring 모듈로 각각 주소와 주소에 딸려오는 query 분석
        - 302 응답 코드, 리다이렉트 주소('/')와 함께 쿠키를 헤더에 넣음
        - 리다이렉트 : 원래 접속한 URL 주소를 새로운 다른 주소로 자동 연결*/

    // 주소가 /login으로 시작하는 경우
    if(req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();

        // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location: '/',
            // 쿠키에는 한글이 들어가면 안되기 때문에 encodeURIComponent로 인코딩
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();

    /* 3. (44 ~ 57)
        - 그 외의 경우(/로 접속했을 때 등), 먼저 쿠키가 있는지 없는지 확인*/

    // name이라는 쿠키가 있는 경우 로그인한 상태로 간주하여 인사말 보냄
    } else if(cookies.name) {
        res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    } else { // 쿠키가 없는 경우 로그인 할 수 있는 페이지 보냄
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            res.end(data);
        } catch(err) {
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    } 
}).listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');
});

