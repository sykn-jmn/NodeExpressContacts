const db = require("./dbPool")

module.exports = async(firstname, lastname)=>{
    await db.query(
        "INSERT INTO people(firstname, lastname)VALUES('"+firstname+"', '"+lastname+"')"
    )
}