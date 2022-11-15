const pool = require("../pool");

const getAll = (request, response) => {
    pool.query(
        'SELECT * FROM "LaTaverneDeLimaginaire".localisation',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

const createLocalisation = (request, response) => {
    let name = request.body.name
    pool.query(
        `INSERT INTO "LaTaverneDeLimaginaire".localisation (name) VALUES ('${name}')`,
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

const deleteLocalisation = (request, response) => {
    let id_deleted = request.body.id;
    pool.query(
        `DELETE FROM "LaTaverneDeLimaginaire".localisation WHERE localisation_id = ${id_deleted}`,
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

const updateLocalisation = (request, response) => {
    let name = request.body.name;
    let id_updated = request.body.id;

    pool.query(
        `UPDATE "LaTaverneDeLimaginaire".localisation SET name = '${name}' WHERE localisation_id = ${id_updated}`,
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

module.exports = { getAll, createLocalisation, deleteLocalisation, updateLocalisation  }