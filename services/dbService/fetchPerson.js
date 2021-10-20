const db = require("./dbPool")

module.exports = async(id) => {
    const query = await db.query(
        `SELECT id, firstname, lastname FROM people WHERE id = $1`,
        [id] 
    )
    return query.rows[0]
}