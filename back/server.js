let express = require("express");
let app = express();
let pg = require("pg").Pool;
const Pool= pg;
let cors = require("cors");
let bcrypt = require("bcrypt");
const { json } = require("express");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(cors());

app.use(express.json());

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
    //verification que l'address mail n'existe pas déjà
    pool.query(
        `SELECT email_address FROM "LaTaverneDeLimaginaire".user WHERE email_address ='${email}'`,
        (error, results) => {
            if (error) {
                throw error
            }
            console.log(JSON.stringify(results.rows).length == 0)
            if( JSON.stringify(results.rows).length != 0 ){
                response
                    .status(200)
                    .send(`Address already registered`);
            }
            else{
                bcrypt.hash(request.body.email, 10, function(error, hash) {
                    if (error) { 
                        throw error;
                    }
                    pool.query(
                        `INSERT INTO "LaTaverneDeLimaginaire".user (last_name, first_name, email_address, password) VALUES ('${lastName}', '${firstName}', '${email}', '${hash}')`,
                        (error, results) => {
                            if (error) {
                                throw error;
                            }
                            response
                                .status(201)
                                .send(`User added with ID: ${results.insertId}`);
                        }
                    );
                });
            }
        }
    )
});

app.post("login", (request, response) => {
    let email = request.body.email
})

app.listen(8080);
