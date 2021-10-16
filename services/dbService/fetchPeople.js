const db = require("./dbPool")

module.exports = async() => {
    const query = await db.query(
        'SELECT * FROM people'
    )
    return query.rows
}