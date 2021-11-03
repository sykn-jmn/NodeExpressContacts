const dbPool = require("./dbPool")

module.exports = async ({id,firstname,lastname,emailAddresses,postaladdresses}) => {
    if (typeof emailAddresses === 'string') {
        emailAddresses = [emailAddresses]
    }
    let db = null;

    try {
        const db = await dbPool.connect()
    
        await db.query("BEGIN")
        const toInsert = !id
        if (toInsert) {
            await db.query(
                `INSERT INTO people(firstname, lastname, emailaddresses) VALUES ($1, $2, $3)`,
                [firstname, lastname, emailAddresses]
            )
            const query = await db.query(
                `SELECT currval('people_id_seq')`
            )
            var newId = query.rows[0].currval;
            postaladdresses.forEach(async postaladdress=>{
                await db.query(
                    `INSERT INTO postaladdresses(street, city, zipcode, p_id) VALUES ($1, $2, $3, $4)`,
                    [postaladdress.street, postaladdress.city, postaladdress.zipcode, newId]
                );
            })
        } else {
            db.query(
                `UPDATE people SET firstname = $1, lastname = $2, emailaddresses = $3
                WHERE id = $4`,
                [firstname, lastname, emailAddresses, id]
            )
            postaladdresses.forEach(postaladdress => {
                db.query(
                    `UPDATE postaladdresses SET street = $1, city = $2, zipcode = $3
                WHERE id = $4`,
                    [postaladdress.street, postaladdress.city, postaladdress.zipcode, postaladdress.id]
                )
            });
        }
        await db.query("COMMIT");
    } catch (error) {
        console.log(error);
        await db?.query("ROLLBACK");       
    } finally{
        db?.release();
    }

}