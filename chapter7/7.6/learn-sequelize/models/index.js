// 시퀄라이즈 패키지/생성자
// config/config.json에서 데이터베이스 설정을 불러온 후 new Sequelize를 통해 MySQL 연결 객체 생성
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize; // 연결 객체를 나중에 재사용 하기 위해 저장해둠

module.exports = db;