module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    choices: {
      type: DataTypes.JSON,
      allowNull: false,
      // Ensure that choices include an array of choice objects and a correctIndex
      validate: {
        isChoicesValid(value) {
          if (!Array.isArray(value)) {
            throw new Error('Choices must be an array');
          }
          const hasCorrectIndex = value.some(choice => choice.isCorrect);
          if (!hasCorrectIndex) {
            throw new Error('One choice must be marked as correct');
          }
        }
      }
    },
  });

  // Here you would define any associations if needed, e.g., Question.belongsTo(models.Quiz)...

  return Question;
};
