const db = require("./dbPool")

module.exports = async() => {
    const query = await db.query(
        'SELECT id, firstname, lastname FROM people  ORDER BY id asc'
    )
    return query.rows
}