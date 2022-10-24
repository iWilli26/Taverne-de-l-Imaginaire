const express = require("express");
const { Pool } = require("pg");
const app = express();
const pg = require("pg").Pool;
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { json } = require("express");
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
dotenv.config();
app.use(cors());

app.use(express.json());

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});

const pool = new Pool({
    user: "application",
    host: "localhost",
    database: "LaTaverne",
    password: "root",
    port: "5432",
});

app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    };

    const token = jwt.sign(data, jwtSecretKey);

    res.send(token);
});

app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in the header of the request
    // Due to security reasons.

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});

app.post("/signup", (request, response) => {
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email;
    let password = request.body.password;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
            pool.query(
                `SELECT email_address FROM "LaTaverneDeLimaginaire".user WHERE email_address ='${email}'`,
                (error, results) => {
                    if (results.rows.length >= 1) {
                        response.status(400).json("Email already exists");
                    } else {
                        pool.query(
                            `INSERT INTO "LaTaverneDeLimaginaire".user (last_name, first_name, email_address, password) VALUES ('${lastName}', '${firstName}', '${email}', '${hash}')`,
                            (error, results) => {
                                if (error) {
                                    throw error;
                                }
                                response
                                    .status(201)
                                    .send(
                                        `User added with ID: ${results.insertId}`
                                    );
                            }
                        );
                    }
                }
            );
        });
    });
});

app.post("/login", (request, response) => {
    let email = request.body.email;
    pool.query(
        `SELECT * FROM "LaTaverneDeLimaginaire".user WHERE email_address ='${email}'`,
        (error, results) => {
            if (results.rows.length == 1) {
                bcrypt
                    .compare(request.body.password, results.rows[0].password)
                    .then((res) => {
                        if (res) {
                            response.status(200).send({
                                data: results.rows[0],
                                error: undefined,
                            });
                        } else {
                            response.status(200).send({
                                data: undefined,
                                error: "Wrong password or email",
                            });
                        }
                    });
            } else {
                response.status(200).send({
                    data: null,
                    error: "Email does not exist",
                });
            }
        }
    );
});

// GESTION FONCTION ADMIN

// Gestion des games

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
    let pseudo = request.body.pseudo;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
            pool.query(
                `INSERT INTO "LaTaverneDeLimaginaire".user (first_name, last_name, email, password, is_admin, pseudo) VALUES ('${firstName}', '${lastName}', '${email}', '${hash}', '${pseudo}', ${isAdmin}, '${pseudo}')`,
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
    let pseudo = request.body.pseudo;
    let id_updated = request.body.id

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
            pool.query(
                `UPDATE "LaTaverneDeLimaginaire".game SET first_name = '${firstName}', last_name = '${lastName}', email = '${email}', password = '${hash}', is_admin = ${isAdmin}, pseudo = '${pseudo}' WHERE user_id = ${id_updated}`,
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