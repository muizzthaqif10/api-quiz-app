const express = require("express");
const router = express.Router();
const { Quiz } = require("../models");

router.get("/", async (req, res) => {
  const quizList = await Quiz.findAll();
  res.json(quizList);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const quiz = await Quiz.findByPk(id);
    res.json(quiz);
  });

router.post("/", async (req, res) => {
  const { title, description } = req.body;

  await Quiz.create({ title: title, description: description });
  res.json(req.body);
});

module.exports = router;
