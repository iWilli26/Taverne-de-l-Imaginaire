
const pool = require("../pool");

const updateGameTags = (request, response) => {
    let ids = request.body.ids;
    let game_id = request.body.game_id;

    let stringDelete = "(" + ids[0];
    for(let i=1; i < ids.length; i++){
        string += ',' + ids[i]
    }
    pool.query(
        `DELETE FROM "LaTaverneDeLimaginaire".game_tag WHERE id IN ${{stringDelete}}`,
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
    )
    let stringInsert=',('+ ids[0]+ ", "+ game_id +")";

    for(let y=1; y<ids.length; y++){
        stringInsert +=',('+ ids[y]+ ", "+ game_id +")"
    }
    pool.query(
        `INSERT INTO "LaTaverneDeLimaginaire".game_tag VALUES ${{stringInsert}}`,
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

module.exports = { updateGameTags }