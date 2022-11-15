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
};

const getCopy = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(
        `SELECT name, description, is_available, copy_id
        from "LaTaverneDeLimaginaire".copy AS C
        INNER JOIN "LaTaverneDeLimaginaire".localisation as L
        ON L.localisation_id = C.localisation_id
        WHERE game_id=${id}`,
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

const getAllwithTransfo = (request, response) =>{
    pool.query(
        'SELECT copy.*, game.name AS game_name, localisation.name AS localisation FROM "LaTaverneDeLimaginaire".copy LEFT JOIN "LaTaverneDeLimaginaire".game ON copy.game_id = game.game_id LEFT JOIN "LaTaverneDeLimaginaire".localisation ON copy.localisation_id = localisation.localisation_id',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    )
}

const createCopy = (request, response) => {
    console.log(request.body.game_id)
    let game_id = request.body.game_id
    let localisation_id = request.body.localisation_id
    let description = request.body.description
    let is_available = request.body.is_available
    pool.query(
        `INSERT INTO "LaTaverneDeLimaginaire".copy (game_id, localisation_id, description, is_available) VALUES (${game_id}, ${localisation_id}, '${description}', ${is_available})`,
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

const deleteCopy = (request, response) => {
    let id_deleted = request.body.id;
    pool.query(
        `DELETE FROM "LaTaverneDeLimaginaire".copy WHERE copy_id = ${id_deleted}`,
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

const updateCopy = (request, response) => {
    let game_id = request.body.game_id;
    let localisation_id = request.body.localisation_id;
    let description = request.body.description;
    let is_available = request.body.is_available;
    let id_updated = request.body.id;

    pool.query(
        `UPDATE "LaTaverneDeLimaginaire".copy SET game_id = ${game_id}, localisation_id = ${localisation_id}, description = '${description}', is_available = ${is_available} WHERE copy_id = ${id_updated}`,
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

const updateAvailableAtTrue = (request, response) => {
    let id_updated = request.body.id
    pool.query(
        `UPDATE "LaTaverneDeLimaginaire".copy SET is_available = true WHERE copy_id = ${id_updated}`,
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

}


module.exports = { getAll, createCopy, deleteCopy, updateCopy, getAllwithTransfo, getCopy, updateAvailableAtTrue };
