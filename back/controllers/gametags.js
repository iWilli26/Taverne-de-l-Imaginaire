
const pool = require("../pool");

const deleteGameTags = (request, response) => {
    let game_id = request.body.game_id;
    pool.query(
        `DELETE FROM "LaTaverneDeLimaginaire".game_tag WHERE game_id = ${game_id}`,
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
                    .send('Tags was succesfully deleted')
            }
        }
    )
};

const createGameTags = (request, response) => {
    let ids = request.body.ids;
    let game_id = request.body.game_id;

    let stringInsert='('+ game_id+ ", "+ ids[0] +")";

                for(let y=1; y<ids.length; y++){
                    stringInsert +=',('+ game_id + ", "+ ids[y] +")"
                }
                pool.query(
                    `INSERT INTO "LaTaverneDeLimaginaire".game_tag VALUES ${stringInsert}`,
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
                                .send('Tags was succesfully added')
                        }
                    }
                );
}

module.exports = { deleteGameTags, createGameTags }