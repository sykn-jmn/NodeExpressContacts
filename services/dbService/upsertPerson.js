const db = require("./dbPool")

module.exports = async({id,firstname, lastname}) => {
    const toInsert = !id
    if (toInsert){
        db.query(
            `INSERT INTO people(firstname, lastname) VALUES ($1, $2)`,
            [firstname, lastname]
        )
    }else{
        db.query(
            `UPDATE people SET firstname = $1, lastname = $2
            WHERE id = $3`,
            [firstname, lastname, id]
        )
    }
}