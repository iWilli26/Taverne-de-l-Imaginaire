const pool = require("../pool");

const post = (request, response) => {
    let user_id = request.body.user_id;
    let copy_id = request.body.copy_id;
    let borrow_date = request.body.borrow_date;
    let return_date = request.body.return_date;
    pool.query(
        `INSERT INTO "LaTaverneDeLimaginaire".borrow (user_id, copy_id, borrowing_date, return_date) VALUES (${user_id}, ${copy_id}, '${borrow_date}', '${return_date}')`,
        (error, results) => {
            if (error) {
                response.status(500).send({ data: undefined, error: error });
            } else {
                response.status(200).send({
                    data: "The borrow was succesfully created",
                    error: undefined,
                });
                pool.query(
                    `UPDATE "LaTaverneDeLimaginaire".copy SET is_available = false WHERE copy_id = ${copy_id}`,
                    (error, results) => {}
                );
            }
        }
    );
};

// const check = (request, response) => {
//     let user_id = request.body.user_id;
//     pool.query();

module.exports = { post };
