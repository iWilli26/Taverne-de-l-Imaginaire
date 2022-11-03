const pool = require("../pool");

const post = (request, response) => {
    pool.query(
        `SELECT * FROM "LaTaverneDeLimaginaire".comment WHERE game_id ='${request.params.id}' AND user_id='${request.body.user_id}'`,
        (error, results) => {
            if (results.rows.length >= 1) {
                response.status(201).send({
                    data: undefined,
                    error: "You already commented this game",
                });
            } else {
                pool.query(
                    `INSERT INTO "LaTaverneDeLimaginaire".comment (game_id, user_id,text,date,note) VALUES (${request.params.id}, ${request.body.user_id}, '${request.body.comment}', '${request.body.date}' , ${request.body.value})`,
                    (error, results) => {
                        if (error) {
                            response
                                .status(500)
                                .send({ error: error, data: undefined });
                        } else {
                            response
                                .status(200)
                                .send({ error: undefined, data: results.rows });
                        }
                    }
                );
            }
        }
    );
};
const get = (request, response) => {
    pool.query(
        `select text,note,username,"LaTaverneDeLimaginaire".comment.user_id, comment_id from "LaTaverneDeLimaginaire".comment 
        INNER JOIN "LaTaverneDeLimaginaire".user 
        ON "LaTaverneDeLimaginaire".comment.user_id = "LaTaverneDeLimaginaire".user.user_id
        WHERE game_id=${request.params.id}`,
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

const suppr = (request, response) => {
    pool.query(
        `DELETE FROM "LaTaverneDeLimaginaire".comment WHERE comment_id = ${request.params.id}`,
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

const edit = (request, response) => {
    pool.query(
        `UPDATE "LaTaverneDeLimaginaire".comment
    SET text = '${request.body.text}', note = ${request.body.note}
    WHERE comment_id = ${request.params.id}`,
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

module.exports = { post, get, suppr, edit };
