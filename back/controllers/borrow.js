const pool = require("../pool");

const post = (request, response) => {
    let user_id = request.body.user_id;
    let copy_id = request.body.copy_id;
    let borrow_date = request.body.borrow_date;
    let return_date = request.body.return_date;
    console.log("1");
    pool.query(
        `select COUNT(*)
	from "LaTaverneDeLimaginaire".borrow AS B
	INNER JOIN "LaTaverneDeLimaginaire".copy AS C
	on C.copy_id=B.copy_id
	where user_id = ${user_id}
	AND is_available=false
	AND CURRENT_DATE
	BETWEEN borrowing_date and return_date`,
        (error, results) => {
            if (error) {
                response.status(500).send({ error: error, data: undefined });
            } else {
                if (results.rows[0].count > 2) {
                    response.status(200).send({
                        error: "Already borrowed 2 games",
                        data: undefined,
                    });
                } else {
                    console.log(
                        `INSERT INTO "LaTaverneDeLimaginaire".borrow (user_id, copy_id, borrowing_date, return_date) VALUES (${user_id}, ${copy_id}, '${borrow_date}', '${return_date}')`
                    );
                    pool.query(
                        `INSERT INTO "LaTaverneDeLimaginaire".borrow (user_id, copy_id, borrowing_date, return_date) VALUES (${user_id}, ${copy_id}, '${borrow_date}', '${return_date}')`,
                        (error, results) => {
                            if (error) {
                                console.log("3");
                                response
                                    .status(500)
                                    .send({ data: undefined, error: error });
                            } else {
                                console.log("4");
                                response.status(200).send({
                                    data: "The borrow was succesfully created",
                                    error: undefined,
                                });
                                console.log("5");
                                pool.query(
                                    `UPDATE "LaTaverneDeLimaginaire".copy SET is_available = false WHERE copy_id = ${copy_id}`,
                                    (error, results) => {}
                                );
                            }
                        }
                    );
                }
            }
        }
    );
};

const getReturnWithTransfo = (request, response) => {
        pool.query(
            'SELECT borrow.*, "LaTaverneDeLimaginaire".user.username, game.name as game_name FROM "LaTaverneDeLimaginaire".borrow LEFT JOIN "LaTaverneDeLimaginaire".user ON borrow.user_id = "LaTaverneDeLimaginaire".user.user_id LEFT JOIN "LaTaverneDeLimaginaire".copy ON borrow.copy_id = "LaTaverneDeLimaginaire".copy.copy_id LEFT JOIN "LaTaverneDeLimaginaire".game ON "LaTaverneDeLimaginaire".copy.game_id = game.game_id WHERE borrow.return_date <= NOW()' ,
            (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).json(results.rows);
            }
        )
}

const updateDescription = (request, response) => {
    let id_updated = request.body.borrow_id;
    let description = request.body.description;
    pool.query(
        `UPDATE "LaTaverneDeLimaginaire".borrow SET description = ${description} WHERE borrow_id = ${id_updated}`,
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    )
}

module.exports = { post, getReturnWithTransfo };
