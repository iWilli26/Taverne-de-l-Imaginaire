const { Pool } = require("pg");
const pool = new Pool({
    user: "application",
    host: "localhost",
    database: "LaTaverne",
    password: "root",
    port: "5432",
});
module.exports = pool;
