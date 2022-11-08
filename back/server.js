const express = require("express");
const app = express();
const cors = require("cors");

const { authenticateToken, createLog } = require("./middlewares/middleware");

const gamesRouter = require("./routes/games");
const usersRouter = require("./routes/users");
const copyRouter = require("./routes/copy");
const authRouter = require("./routes/auth");
const tagRouter = require("./routes/tag");
const commentRouter = require("./routes/comment");
const borrowRouter = require("./routes/borrow");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

require("dotenv").config({ path: __dirname + "/.env" });

app.use(cors());

app.use(express.json());
app.use(createLog);
app.use(authRouter);
app.use("/games", gamesRouter);
app.use("/tag", tagRouter);
app.use("/users", usersRouter);
app.use("/copy", copyRouter);
app.use("/comment", commentRouter);
app.use("/borrow", borrowRouter);

//Mettre le authenticateToken dans chaque truc ou faut être connecté
app.get("/test", authenticateToken, (request, response) => {
    response.status(200).send("You are authenticated");
});

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});
