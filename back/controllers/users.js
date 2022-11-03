const pool = require("../pool");

const createUser = (request, response) => {
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email;
    let password = request.body.password;
    let isAdmin = request.body.IsAdmin;
    let username = request.body.username;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
            pool.query(
                `INSERT INTO "LaTaverneDeLimaginaire".user (first_name, last_name, email, password, is_admin, username) VALUES ('${firstName}', '${lastName}', '${email}', '${hash}', '${pseudo}', ${isAdmin}, '${username}')`,
                (error,results) => {
                    if(error){
                        response
                            .status(500)
                            .send('An error as occured, please see the code \n', error)
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
                response
                    .status(500)
                    .send('An error as occured, please see the code \n', error)
            }
            else {
                response
                    .status(200)
                    .send('The user was succesfully deleted')
            }
        }
    )
}

const updateUser = (request, response) => {
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email;
    let password = request.body.password;
    let isAdmin = request.body.IsAdmin;
    let username = request.body.username;
    let id_updated = request.body.id

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
            pool.query(
                `UPDATE "LaTaverneDeLimaginaire".game SET first_name = '${firstName}', last_name = '${lastName}', email = '${email}', password = '${hash}', is_admin = ${isAdmin}, pseudo = '${username}' WHERE user_id = ${id_updated}`,
                (error,results) => {
                    if(error){
                        response
                            .status(500)
                            .send('An error as occured, please see the code \n', error)
                    }
                    else{
                        response
                            .status(200)
                            .send('The game was succesfully updated')
                    }
                }
            )
        })
    })
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

module.exports = { getAll, createUser, deleteUser, updateUser };