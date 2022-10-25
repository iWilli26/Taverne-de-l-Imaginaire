const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const { authenticateToken, createLog } = require("./middlewares/middleware");

const gamesRouter = require("./routes/games");
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

//Mettre le authenticateToken dans chaque truc ou faut être connecté
app.get("/test", authenticateToken, (request, response) => {
    response.status(200).send("You are authenticated");
});

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});

// Gestion des copy

app.post("/game/create", (request, response) => {
    let game_id = request.body.game_id
    let localisation_id = request.body.localisation_id
    let description = request.body.description
    let is_available = request.body.is_available

    pool.query(
        `INSERT INTO "LaTaverneDeLimaginaire".game (game_id, localisation_id, description, is_available) VALUES (${game_id}, ${localisation_id}, '${description}', ${is_available})`,
        (error,results) => {
            if(error){
                response
                    .status(500)
                    .send('An error as occured, please see the code \n', error)
            }
            else{
                response
                    .status(200)
                    .send('The copy was succesfully created')
            }
        }
    )
})

app.post("/game/delete", (request, response) => {
    let id_deleted = request.body.id
    pool.query(
        `DELETE FROM "LaTaverneDeLimaginaire".game WHERE copy_id = ${id_deleted}`,
        (error, results) => {
            if(error){
                response
                    .status(500)
                    .send('An error as occured, please see the code \n', error)
            }
            else {
                response
                    .status(200)
                    .send('The copy was succesfully deleted')
            }
        }
    )
})

app.post("/game/update", (request, response) =>{
    let game_id = request.body.game_id
    let localisation_id = request.body.localisation_id
    let description = request.body.description
    let is_available = request.body.is_available
    let id_updated = request.body.id

    pool.query(
        `UPDATE "LaTaverneDeLimaginaire".game SET game_id = ${game_id}, localisation_id = ${localisation_id}, description = '${description}', is_available = ${is_available} WHERE copy_id = ${id_updated}`,
        (error,results) => {
            if(error){
                response
                    .status(500)
                    .send('An error as occured, please see the code \n', error)
            }
            else{
                response
                    .status(200)
                    .send('The copy was succesfully updated')
            }
        }
    )
})

app.get("/copies", (request, response) => {
    pool.query(
        'SELECT * FROM "LaTaverneDeLimaginaire".copy',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
});