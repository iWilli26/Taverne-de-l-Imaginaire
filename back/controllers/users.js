const pool = require("../pool");
const bcrypt = require("bcrypt")

const createUser = (request, response) => {
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email;
    let password = request.body.password;
    let isAdmin = request.body.isAdmin;
    let username = request.body.username;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
            pool.query(
                `INSERT INTO "LaTaverneDeLimaginaire".user (first_name, last_name, email_address, password, username, is_admin) VALUES ('${firstName}', '${lastName}', '${email}', '${hash}', '${username}', ${isAdmin})`,
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
                            .send('The user was succesfully created')
                    }
                }
            )
        })
    })
}

const deleteUser = (request, response) => {
    let id_deleted = request.body.id
    pool.query(
        `DELETE FROM "LaTaverneDeLimaginaire".user WHERE user_id = ${id_deleted}`,
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
                    .send('The user was succesfully deleted')
            }
        }
    )
}

const updateUserWhithoutPassword = (request, response) => {
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email;
    let isAdmin = request.body.isAdmin;
    let username = request.body.username;
    let id_updated = request.body.id
    pool.query(
        `UPDATE "LaTaverneDeLimaginaire".user SET first_name = '${firstName}', last_name = '${lastName}', email_address = '${email}', is_admin = ${isAdmin}, username = '${username}' WHERE user_id = ${id_updated}`,
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
                    .send('The game was succesfully updated')
            }
        }
    )
}
    


const getAll = (request, response) => {
    pool.query(
        'SELECT user_id, last_name, first_name, username, email_address, is_admin FROM "LaTaverneDeLimaginaire".user',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}

module.exports = { getAll, createUser, deleteUser, updateUserWhithoutPassword };