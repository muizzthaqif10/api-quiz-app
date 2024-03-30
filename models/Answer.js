// answer.js
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define("Answer", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    selectedAnswer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Answer.associate = (models) => {
    Answer.belongsTo(models.Attempt, {
      foreignKey: "attemptId",
      onDelete: "CASCADE",
    });
    Answer.belongsTo(models.Question, {
      foreignKey: "questionId",
      onDelete: "CASCADE",
    });
  };

  return Answer;
};
