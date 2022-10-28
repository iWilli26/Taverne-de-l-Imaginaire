const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../pool");
require("dotenv").config({ path: __dirname + "/../.env" });
const login = (request, response) => {
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
                                expiresIn: "3600s",
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
};

const signup = (request, response) => {
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email;
    let username = request.body.username;
    let password = request.body.password;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
            pool.query(
                `SELECT email_address FROM "LaTaverneDeLimaginaire".user WHERE email_address ='${email}'`,
                (error, results) => {
                    if (results.rows.length >= 1) {
                        response.status(201).send({
                            data: undefined,
                            error: "Email already exists",
                        });
                    } else {
                        pool.query(
                            `SELECT username FROM "LaTaverneDeLimaginaire".user WHERE username ='${username}'`,
                            (error, results) => {
                                if (results.rows.length >= 1) {
                                    response.status(201).send({
                                        data: undefined,
                                        error: "Username already exists",
                                    });
                                } else {
                                    pool.query(
                                        `INSERT INTO "LaTaverneDeLimaginaire".user (last_name, first_name,username, email_address, password) VALUES ('${lastName}', '${firstName}','${username}' ,'${email}', '${hash}')`,
                                        (error, results) => {
                                            if (error) {
                                                throw error;
                                            }
                                            response.status(201).send({
                                                data: {
                                                    lastName: lastName,
                                                    firstName: firstName,
                                                    username: username,
                                                    email: email,
                                                    password: hash,
                                                },
                                                error: undefined,
                                            });
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            );
        });
    });
};

module.exports = { signup, login };
