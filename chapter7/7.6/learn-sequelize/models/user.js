const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({ // super.init의 첫번째 인수는 column 정의
      name: {
        type: Sequelize.STRING(20),
        allowNull: false, // not null
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN, // 1/0이 아니라 true/false
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, { // 두 번째 인수는 모델에 대한 설정
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',// 실제 데이터베이스의 테이블 이름
      paranoid: false, // true인 경우 deletedAt 칼럼이 생성됨
      charset: 'utf8', // 한글 입력
      collate: 'utf8_general_ci', // 한글 입력
    });
  }

  // hasMany -> 1 : N
  // 한 명의 사용자가 여러개의 댓글을 작성할 수 있음
  static associate(db) { 
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};