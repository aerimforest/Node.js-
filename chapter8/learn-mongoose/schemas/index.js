const mongoose = require('mongoose');

const connect = () => {
    // 개발 환경일 때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인할 수 있게 함
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    // 몽구스를 사용하여 노드와 몽고디비 연결
    mongoose.connect('mongodb://yerim:yerim0602!@localhost:27017/admin', {
        dbName: 'nodejs', // 실제 사용할 데이터베이스 이름
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (error) => { // 연결 여부 확인하는 콜백함수
        if (error) {
            console.log('몽고디비 연결 에러', error);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });
};

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error); // 에러 발생 시 에러내용 기록
});
mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect(); // 재연결 시도
});

module.exports = connect;