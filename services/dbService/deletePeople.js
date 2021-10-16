const db = require("./dbPool")

module.exports = async (id)=>{
    query = await db.query(
        'DELETE FROM people WHERE id='+id
    )
}