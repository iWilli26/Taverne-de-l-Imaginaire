const pool = require("../pool");

const getAllwithGames = (request, response) => {
    pool.query(
        'SELECT * FROM "LaTaverneDeLimaginaire".tag INNER JOIN "LaTaverneDeLimaginaire".game_tag ON "LaTaverneDeLimaginaire".game_tag.tag_id="LaTaverneDeLimaginaire".tag.tag_id',
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

const createTag = (request, response) => {
    let name = request.body.name
    pool.query(
        `INSERT INTO "LaTaverneDeLimaginaire".tag (name) VALUES ('${name}')`,
        (error,results) => {
            if(error){
                console.log(error);
                response
                    .status(500)
                    .send('An error as occured, please see the code \n')
            }
            else{
                response
                    .status(200)
                    .send('The copy was succesfully created')
            }
        }
    );
};

const deleteTag = (request, response) => {
    let id_deleted = request.body.id;
    pool.query(
        `DELETE FROM "LaTaverneDeLimaginaire".tag WHERE tag_id = ${id_deleted}`,
        (error, results) => {
            if(error){
                console.log(error)
                response
                    .status(500)
                    .send('An error as occured, please see the code \n')
            }
            else {
                response
                    .status(200)
                    .send('The copy was succesfully deleted')
            }
        }
    );
};

const updateTag = (request, response) => {
    let name = request.body.name;
    let id_updated = request.body.id;

    pool.query(
        `UPDATE "LaTaverneDeLimaginaire".tag SET name = '${name}' WHERE tag_id = ${id_updated}`,
        (error,results) => {
            if(error){
                console.log(error)
                response
                    .status(500)
                    .send('An error as occured, please see the code \n')
            }
            else{
                response
                    .status(200)
                    .send('The copy was succesfully updated')
            }
        }
    );
};

module.exports = { getAllwithGames, getTag, getAll, createTag, updateTag, deleteTag };
