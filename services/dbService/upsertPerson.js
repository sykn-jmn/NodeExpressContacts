const db = require("./dbPool")

module.exports = async({id,firstname, lastname, emailAddresses}) => {
    if(typeof emailAddresses === 'string'){
        emailAddresses = [emailAddresses]
    }
    const toInsert = !id
    if (toInsert){
        const query = await db.query(
            `INSERT INTO people(firstname, lastname, emailaddresses) VALUES ($1, $2, $3)`,
            [firstname, lastname, emailAddresses]
        )
        console.log(query.rows);
    }else{
        db.query(
            `UPDATE people SET firstname = $1, lastname = $2, emailaddresses = $3
            WHERE id = $4`,
            [firstname, lastname, emailAddresses, id]
        )
    }
}