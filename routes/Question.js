const express = require("express");
const router = express.Router();
const { Question } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/:quizId", async (req, res) => {
  const quizId = req.params.quizId;
  const question = await Question.findAll({ where: { QuizId: quizId } });
  res.json(question);
});

router.post("/", async (req, res) => {
  const question = req.body;
  await Question.create(question);
  res.json(question);
});

// router.delete("/:commentId", validateToken, async (req, res) => {
//   const commentId = req.params.commentId;

//   await Comments.destroy({
//     where: {
//       id: commentId,
//     },
//   });

//   res.json("DELETED SUCCESSFULLY");
// });

module.exports = router;