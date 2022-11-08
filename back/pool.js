const { Pool } = require("pg");
const conf = require('./conf_back')
const pool = new Pool({
    user: conf.Account.name,
    host: conf.BDD.address,
    database: conf.BDD.name,
    password: conf.Account.password,
    port: conf.BDD.port,
});
module.exports = pool;
