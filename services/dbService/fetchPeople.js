const db = require("./dbPool")

module.exports = async() => {
    const query = await db.query(
        'SELECT p_id id, firstname, lastname FROM people  ORDER BY id asc'
    )
    return query.rows
}