// answerRouter.js
const express = require("express");
const router = express.Router();
const { Answer } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { attemptId, questionId, selectedAnswer, isCorrect } = req.body;
    const answer = await Answer.create({
      attemptId: attemptId,
      questionId: questionId,
      selectedAnswer: selectedAnswer,
      isCorrect: isCorrect,
    });
    res.status(201).json(answer);
  } catch (error) {
    console.error("Error creating answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/bulk", async (req, res) => {
  try {
    // Expect req.body to be an array of answers
    const answers = await Answer.bulkCreate(req.body);
    res.status(201).json(answers);
  } catch (error) {
    console.error("Error creating answers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
