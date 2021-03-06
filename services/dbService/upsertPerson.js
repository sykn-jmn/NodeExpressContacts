const dbPool = require("./dbPool")
const { v4: uuidv4 } = require('uuid');

module.exports = async ({id,firstname,lastname,emailAddresses,postaladdresses}) => {

    if (typeof emailAddresses === 'string') {
        emailAddresses = [emailAddresses]
    }
    if (postaladdresses == undefined){
        postaladdresses = [];
    }
    let db = null;

    try {
        db = await dbPool.connect()
    
        await db.query("BEGIN")
        if (id=="") {
            id = uuidv4();
            await db.query(
                `INSERT INTO people(firstname, lastname, emailaddresses, p_id) VALUES ($1, $2, $3, $4)`,
                [firstname, lastname, emailAddresses, id]
            )

            postaladdresses.forEach(async postaladdress=>{
                pa_id = uuidv4();
                await db.query(
                    `INSERT INTO postaladdresses(street, city, zipcode, p_id, pa_id) VALUES ($1, $2, $3, $4, $5)`,
                    [postaladdress.street, postaladdress.city, postaladdress.zipcode, id, pa_id]
                );
            })
        } else {
            await db.query(
                `UPDATE people SET firstname = $1, lastname = $2, emailaddresses = $3
                WHERE p_id = $4`,
                [firstname, lastname, emailAddresses, id]
            )

            const pa_ids = postaladdresses.filter(i => !!i.id && i.id!="").map(i=>`'${i.id}'`).join(',');
            if(pa_ids.length>0){
                await db.query(
                    `DELETE FROM postaladdresses WHERE pa_id NOT IN (${pa_ids}) AND p_id = '${id}'`
                );
            }else{
                await db.query(
                    `DELETE FROM postaladdresses WHERE p_id = '${id}'`
                );
            }

            postaladdresses?.forEach(postaladdress => {
                if(postaladdress==""){
                    console.log("Empty Postal Address");
                    return;
                }
                if(postaladdress.id == "" || !postaladdress.id){
                    pa_id = uuidv4();
                    db.query(`INSERT INTO postaladdresses(street, city, zipcode, p_id, pa_id) VALUES ($1, $2, $3, $4, $5)`,
                    [postaladdress.street, postaladdress.city, postaladdress.zipcode, id, pa_id])
                }else{
                    db.query(
                        `UPDATE postaladdresses SET street = $1, city = $2, zipcode = $3
                    WHERE pa_id = $4`,
                        [postaladdress.street, postaladdress.city, postaladdress.zipcode, postaladdress.id]
                    )
                }
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