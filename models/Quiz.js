module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define("Quiz", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Quiz.associate = (models) => {
    Quiz.hasMany(models.Question, {
      foreignKey: "QuizId",
      onDelete: "cascade",
    });
  };

  return Quiz;
};
