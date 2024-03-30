const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
require("dotenv").config();

const db = require("./models");

//Routers

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

const quizRouter = require("./routes/Quiz");
app.use("/quiz", quizRouter);

const questionRouter = require("./routes/Question");
app.use("/question", questionRouter);

const attemptRouter = require("./routes/Attempt");
app.use("/attempt", attemptRouter);

const answerRouter = require("./routes/Answer");
app.use("/answer", answerRouter);

db.sequelize.sync().then(() =>{
    app.listen(process.env.PORT || 27438, () => {
        console.log("Serever run on port 27438");
    });
});

