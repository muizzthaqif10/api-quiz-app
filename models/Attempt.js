module.exports = (sequelize, DataTypes) => {
    const Attempt = sequelize.define('Attempt', {
      // Assuming each attempt has a unique ID
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      // Score or any other metric to assess performance
      score: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // Timestamp of the attempt
      attemptedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
      // You can add more fields here as needed, e.g., a JSON field to store answers
    });

    Attempt.associate = (models) => {
        // Assuming models.User and models.Quiz are your user and quiz models
        Attempt.belongsTo(models.Users, {
          foreignKey: 'userId',
          as: 'user'
        });
        Attempt.belongsTo(models.Quiz, {
          foreignKey: 'quizId',
          as: 'quiz'
        });
      };
  
    return Attempt;
  };
  