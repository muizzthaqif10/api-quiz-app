const express = require("express");
const router = express.Router();
const { Attempt, Answer, Users, Quiz } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

// Create a new attempt

// Route to update the score of an attempt based on correct answers
router.put('/updateScore/:attemptId', async (req, res) => {
  const { attemptId } = req.params;

  try {
    // First, count the correct answers for the given attempt
    const correctAnswersCount = await Answer.count({
      where: {
        attemptId: attemptId,
        isCorrect: true
      }
    });

    // Now, calculate the score. This depends on your scoring logic.
    // For example, if each correct answer gives 1 point:
    const score = correctAnswersCount; // Adjust this calculation as needed

    // Then, update the Attempt record with the new score
    const updatedAttempt = await Attempt.update({ score: score }, {
      where: {
        id: attemptId
      }
    });

    res.json({ message: 'Attempt score updated successfully', updatedAttempt });
  } catch (error) {
    console.error('Error updating attempt score:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post("/", async (req, res) => {
  try {
    const { userId, quizId, score, attemptedAt } = req.body;
    const newAttempt = await Attempt.create({
      userId:userId,
      quizId: quizId,
      score:score,
      attemptedAt: attemptedAt
    });
    res.status(201).json(newAttempt);
  } catch (error) {
    console.error("Error creating attempt:", error);
    res.status(500).json({ error: "Failed to create attempt" });
  }
});

router.get("/:userId/:quizId", async (req, res) => {
  const userId = req.params.userId;
  const quizId = req.params.quizId;
  const attempt = await Attempt.findAll({ 
    where: { 
      UserId: userId,
      QuizId: quizId  // Include quizId in the query condition
    } 
  });
  res.json(attempt);
});

router.get("/:attemptId", async (req, res) => {
  const attemptId = req.params.attemptId;
  const attempt = await Attempt.findAll({ 
    where: { 
      id: attemptId,
    } 
  });
  res.json(attempt);
});



module.exports = router;
