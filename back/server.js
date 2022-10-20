let express = require("express");
const { Pool } = require("pg");
let app = express();
let pg = require("pg").Pool;
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
const pool = new Pool({
    user: "application",
    host: "localhost",
    database: "LaTaverne",
    password: "root",
    port: "5432",
});

app.get("/games/", (request, response) => {
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

app.listen(8080);
