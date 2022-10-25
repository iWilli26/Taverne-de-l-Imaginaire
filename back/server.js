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







app.post("/game/create", (request, response) => {
    let name = request.body.name
    let number_of_player = request.body.number_of_player
    let average_time = request.body.average_time
    let description = request.body.description
    let author = request.body.author
    let editor = request.body.editor
    pool.query(
        `INSERT INTO "LaTaverneDeLimaginaire".game (name, number_of_player, average_time, description, author, editor) VALUES ('${name}', '${number_of_player}', '${average_time}', '${description}', '${author}', '${editor}')`,
        (error,results) => {
            if(error){
                response
                    .status(500)
                    .send('An error as occured, please see the code \n', error)
            }
            else{
                response
                    .status(200)
                    .send('The game was succesfully created')
            }
        }
    )
})

app.post("/game/delete", (request, response) => {
    let id_deleted = request.body.id
    pool.query(
        `DELETE FROM "LaTaverneDeLimaginaire".game WHERE game_id = ${id_deleted}`,
        (error, results) => {
            if(error){
                response
                    .status(500)
                    .send('An error as occured, please see the code \n', error)
            }
            else {
                response
                    .status(200)
                    .send('The game was succesfully deleted')
            }
        }
    )
})

app.post("/game/update", (request, response) =>{
    let name = request.body.name
    let number_of_player = request.body.number_of_player
    let average_time = request.body.average_time
    let description = request.body.description
    let author = request.body.author
    let editor = request.body.editor
    let id_updated = request.body.id
    pool.query(
        `UPDATE "LaTaverneDeLimaginaire".game SET name = '${name}', number_of_player = '${number_of_player}', average_time = '${average_time}', description = '${description}', author = '${author}', editor = '${editor}' WHERE game_id = ${id_updated}`,
        (error,results) => {
            if(error){
                response
                    .status(500)
                    .send('An error as occured, please see the code \n', error)
            }
            else{
                response
                    .status(200)
                    .send('The game was succesfully updated')
            }
        }
    )
})

app.get("/games", (request, response) => {
    pool.query(
        'SELECT * FROM "LaTaverneDeLimaginaire".game',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
});

// Gestion des users
app.post("/user/create", (request, response) => {
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email;
    let password = request.body.password;
    let isAdmin = request.body.IsAdmin;
    let username = request.body.username;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
            pool.query(
                `INSERT INTO "LaTaverneDeLimaginaire".user (first_name, last_name, email, password, is_admin, username) VALUES ('${firstName}', '${lastName}', '${email}', '${hash}', '${pseudo}', ${isAdmin}, '${username}')`,
                (error,results) => {
                    if(error){
                        response
                            .status(500)
                            .send('An error as occured, please see the code \n', error)
                    }
                    else{
                        response
                            .status(200)
                            .send('The user was succesfully created')
                    }
                }
            )
        })
    })
})

app.post("/user/delete", (request, response) => {
    let id_deleted = request.body.id
    pool.query(
        `DELETE FROM "LaTaverneDeLimaginaire".user WHERE user_id = ${id_deleted}`,
        (error, results) => {
            if(error){
                response
                    .status(500)
                    .send('An error as occured, please see the code \n', error)
            }
            else {
                response
                    .status(200)
                    .send('The user was succesfully deleted')
            }
        }
    )
})

app.post("/user/update", (request, response) =>{
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email;
    let password = request.body.password;
    let isAdmin = request.body.IsAdmin;
    let username = request.body.username;
    let id_updated = request.body.id

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
            pool.query(
                `UPDATE "LaTaverneDeLimaginaire".game SET first_name = '${firstName}', last_name = '${lastName}', email = '${email}', password = '${hash}', is_admin = ${isAdmin}, pseudo = '${username}' WHERE user_id = ${id_updated}`,
                (error,results) => {
                    if(error){
                        response
                            .status(500)
                            .send('An error as occured, please see the code \n', error)
                    }
                    else{
                        response
                            .status(200)
                            .send('The game was succesfully updated')
                    }
                }
            )
        })
    })
})

app.get("/users", (request, response) => {
    pool.query(
        'SELECT * FROM "LaTaverneDeLimaginaire".user',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
});

// Gestion des copy

app.post("/game/create", (request, response) => {
    let game_id = request.body.game_id
    let localisation_id = request.body.localisation_id
    let description = request.body.description
    let is_available = request.body.is_available

    pool.query(
        `INSERT INTO "LaTaverneDeLimaginaire".copy (game_id, localisation_id, description, is_available) VALUES (${game_id}, ${localisation_id}, '${description}', ${is_available})`,
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
        `DELETE FROM "LaTaverneDeLimaginaire".copy WHERE copy_id = ${id_deleted}`,
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
        `UPDATE "LaTaverneDeLimaginaire".copy SET game_id = ${game_id}, localisation_id = ${localisation_id}, description = '${description}', is_available = ${is_available} WHERE copy_id = ${id_updated}`,
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