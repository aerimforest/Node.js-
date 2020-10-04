const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  // 각 모델간의 관계
  static associate(db) {
    db.User.hasMany(db.Post); // User : Post = 1 : N
    // User : User = N : M
    db.User.belongsToMany(db.User, { 
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow', // 같은 테이블간의 N:M 관계에서는 모델 이름과 컬럼 이름을 따로 정해야 함
    });
    db.User.belongsToMany(db.User, { 
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};
