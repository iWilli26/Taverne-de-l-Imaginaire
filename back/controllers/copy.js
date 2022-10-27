const pool = require("../pool");

const getAll = (request, response) => {
    pool.query(
        'SELECT * FROM "LaTaverneDeLimaginaire".copy',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}

const createCopy = (request, response) => {
    let game_id = request.body.game_id
    let localisation_id = request.body.localisation_id
    let description = request.body.description
    let is_available = request.body.is_available

    pool.query(
        `INSERT INTO "LaTaverneDeLimaginaire".copy (game_id, localisation_id, description, is_available) VALUES (${game_id}, ${localisation_id}, '${description}', ${is_available})`,
        (error,results) => {
            if(error){
                response
                    .status(500)
                    .send('An error as occured, please see the code \n', error)
            }
            else{
                response
                    .status(200)
                    .send('The copy was succesfully created')
            }
        }
    )
}

const deleteCopy = (request, response) => {
    let id_deleted = request.body.id
    pool.query(
        `DELETE FROM "LaTaverneDeLimaginaire".copy WHERE copy_id = ${id_deleted}`,
        (error, results) => {
            if(error){
                response
                    .status(500)
                    .send('An error as occured, please see the code \n', error)
            }
            else {
                response
                    .status(200)
                    .send('The copy was succesfully deleted')
            }
        }
    )
}

const updateCopy = (request, response) => {
    let game_id = request.body.game_id
    let localisation_id = request.body.localisation_id
    let description = request.body.description
    let is_available = request.body.is_available
    let id_updated = request.body.id

    pool.query(
        `UPDATE "LaTaverneDeLimaginaire".copy SET game_id = ${game_id}, localisation_id = ${localisation_id}, description = '${description}', is_available = ${is_available} WHERE copy_id = ${id_updated}`,
        (error,results) => {
            if(error){
                response
                    .status(500)
                    .send('An error as occured, please see the code \n', error)
            }
            else{
                response
                    .status(200)
                    .send('The copy was succesfully updated')
            }
        }
    )
}


module.exports = { getAll, createCopy, deleteCopy, updateCopy };