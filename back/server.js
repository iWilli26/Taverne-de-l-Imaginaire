let express = require("express");
const { Pool } = require("pg");
let app = express();
let pg = require("pg").Pool;
let cors = require("cors");
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
    let password = request.body.password;
    pool.query(
        `INSERT INTO "LaTaverneDeLimaginaire".user (last_name, first_name, email_address, password) VALUES ('${lastName}', '${firstName}', '${email}', '${password}')`,
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

app.listen(8080);
