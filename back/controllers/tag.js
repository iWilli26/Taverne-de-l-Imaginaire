const pool = require("../pool");

const getAll = (request, response) => {
    pool.query(
        'SELECT * FROM "LaTaverneDeLimaginaire".tag',
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
const getTag = (request, response) => {
    pool.query(
        `select * from "LaTaverneDeLimaginaire".tag 
        INNER JOIN "LaTaverneDeLimaginaire".game_tag 
        ON "LaTaverneDeLimaginaire".game_tag.tag_id="LaTaverneDeLimaginaire".tag.tag_id
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
module.exports = { getAll, getTag };
