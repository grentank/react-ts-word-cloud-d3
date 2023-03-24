const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'authorId' });
    }
  }
  Answer.init(
    {
      body: DataTypes.TEXT,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Answer',
    },
  );
  return Answer;
};
