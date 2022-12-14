const pool = require("../pool");

const getAll = (request, response) => {
    pool.query(
        'SELECT * FROM "LaTaverneDeLimaginaire".game',
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

const getTags = (request, response) => {
    console.log("a");
    pool.query(
        'SELECT * from "LaTaverneDeLimaginaire".game',
        (error, results) => {
            if (error) {
                console.log("test");
                response.status(500).send({ error: error, data: undefined });
            } else {
                console.log("teffffst");
                response
                    .status(200)
                    .send({ error: undefined, data: results.rows });
            }
        }
    );
};

const getGame = (request, response) => {
    pool.query(
        `SELECT * FROM "LaTaverneDeLimaginaire".game WHERE game_id = ${request.params.id}`,
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

const createGame = (request, response) => {
    let name = request.body.name;
    let number_of_player = request.body.number_of_player;
    let average_time = request.body.average_time;
    let description = request.body.description;
    let author = request.body.author;
    let editor = request.body.editor;
    pool.query(
        `INSERT INTO "LaTaverneDeLimaginaire".game (name, number_of_player, average_time, description, author, editor) VALUES ('${name}', '${number_of_player}', '${average_time}', '${description}', '${author}', '${editor}')`,
        (error, results) => {
            if (error) {
                response.status(500).send(error);
            } else {
                response.status(200).send("The game was succesfully created");
            }
        }
    );
};

const deleteGame = (request, response) => {
    let id_deleted = request.body.id;
    console.log(id_deleted);
    pool.query(
        `DELETE FROM "LaTaverneDeLimaginaire".game WHERE game_id = ${id_deleted}`,
        (error, results) => {
            if (error) {
                console.log(error);
                response.status(500).send("An error has occured, see the code");
            } else {
                response.status(200).send("The game was succesfully deleted");
            }
        }
    );
};

const updateGame = (request, response) => {
    console.log(request.body);
    let name = request.body.name;
    let number_of_player = request.body.number_of_player;
    let average_time = request.body.average_time;
    let description = request.body.description;
    let author = request.body.author;
    let editor = request.body.editor;
    let id_updated = request.body.id;
    console.log(
        `UPDATE "LaTaverneDeLimaginaire".game SET name = '${name}', number_of_player = '${number_of_player}', average_time = '${average_time}', description = '${description}', author = '${author}', editor = '${editor}' WHERE game_id = ${id_updated}`
    );
    pool.query(
        `UPDATE "LaTaverneDeLimaginaire".game SET name = '${name}', number_of_player = '${number_of_player}', average_time = '${average_time}', description = '${description}', author = '${author}', editor = '${editor}' WHERE game_id = ${id_updated}`,
        (error, results) => {
            if (error) {
                response.status(200).send(error);
            } else {
                response.status(200).send("The game was succesfully updated");
            }
        }
    );
};

module.exports = {
    getAll,
    createGame,
    deleteGame,
    updateGame,
    getGame,
    getTags,
};
