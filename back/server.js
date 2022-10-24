const express = require("express");
const { Pool } = require("pg");
const app = express();
const pg = require("pg").Pool;
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const authenticateToken = require("./middleware");
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
                            let jwtSecretKey = process.env.JWT_SECRET_KEY;
                            let data = {
                                time: Date(),
                                userId: results.rows[0].id,
                            };
                            const token = jwt.sign(data, jwtSecretKey, {
                                expiresIn: "1800s",
                            });

                            response.status(200).send({
                                data: results.rows[0],
                                token: token,
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

//Mettre le 
app.get("/test", authenticateToken, (request, response) => {
    response.status(200).send("You are authenticated");
});
