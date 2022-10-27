const pool = require("../pool");

const post = (request, response) => {
    console.log(
        `INSERT INTO "LaTaverneDeLimaginaire".comment (game_id, user_id,text,date,note) VALUES (${request.params.id}, ${request.body.user_id}, '${request.body.comment}',${request.body.date} , ${request.body.value})`
    );
    pool.query(
        `INSERT INTO "LaTaverneDeLimaginaire".comment (game_id, user_id,text,date,note) VALUES (${request.params.id}, ${request.body.user_id}, '${request.body.comment}', '${request.body.date}' , ${request.body.value})`,
        (error, results) => {
            if (error) {
                response.status(500).send({ error: error, data: undefined });
            } else {
                response
                    .status(200)
                    .send({ error: undefined, data: results.rows });
            }
        }
    );
};
const get = (request, response) => {
    pool.query(
        `select text,note,username from "LaTaverneDeLimaginaire".comment 
        INNER JOIN "LaTaverneDeLimaginaire".user 
        ON "LaTaverneDeLimaginaire".comment.user_id = "LaTaverneDeLimaginaire".user.user_id
        WHERE game_id=1`,
        (error, results) => {
            if (error) {
                response.status(500).send({ error: error, data: undefined });
            } else {
                response
                    .status(200)
                    .send({ error: undefined, data: results.rows });
            }
        }
    );
};
module.exports = { post, get };
