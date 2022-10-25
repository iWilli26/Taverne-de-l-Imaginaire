const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const { authenticateToken, createLog } = require("./middlewares/middleware");

const gamesRouter = require("./routes/games");
const usersRouter = require("./routes/users");
const copyRouter = require("./routes/copy");
const authRouter = require("./routes/auth");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

dotenv.config();
app.use(cors());

app.use(express.json());
app.use(createLog);

app.use(authRouter);
app.use("/games", gamesRouter);
app.use("/users", usersRouter);
app.use("/copy", copyRouter);

//Mettre le authenticateToken dans chaque truc ou faut être connecté
app.get("/test", authenticateToken, (request, response) => {
    response.status(200).send("You are authenticated");
});

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});
