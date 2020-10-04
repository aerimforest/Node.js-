// 시퀄라이즈 패키지/생성자
// config/config.json에서 데이터베이스 설정을 불러온 후 new Sequelize를 통해 MySQL 연결 객체 생성
const Sequelize = require('sequelize');

const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize; // 연결 객체를 나중에 재사용 하기 위해 저장해둠
db.Sequelize = Sequelize;

// db객체를 require하여 User와 Comment 모델에 접근할 수 있도록 담아둠
db.User = User;
db.Comment = Comment;

// 테이블을 모델과 연결
User.init(sequelize);
Comment.init(sequelize);

// 다른 테이블과의 관계 연결
User.associate(db);
Comment.associate(db);

module.exports = db;