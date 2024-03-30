const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const {validateToken} = require("../middleware/AuthMiddleware");
// router.get("/", async (req,res) =>{
//     const postList = await Posts.findAll();
//     res.json(postList);
// });

router.post("/", async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      email: email,
      password: hash,
      isAdmin: isAdmin || false,
    });
    res.json("Success");
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    return res.json({
      error: "User doesn't exist!",
    });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({
        error: "Wrong email and password combination",
      });
    }

    const accessToken = sign(
      { email: user.email, username:user.username, id: user.id },
      "importantsecret"
    );
    return res.json({
      token: accessToken,
      username: user.username,
      id: user.id,
    });
  });
});


router.get("/auth", validateToken, async (req, res) =>{
    res.json(req.user);
});

module.exports = router;
