const db = require("./dbPool")

module.exports = async(id) => {
    const query = await db.query(
        `select 	p.id,
		    p.firstname, 
		    p.lastname, 
		    p.emailaddresses,
		    json_agg(
			json_build_object(
				'id', pa.id,
				'street', pa.street,
				'city', pa.city,
				'zipcode', pa.zipcode
			) 
            )postaladdresses
            from people as p 
            join postaladdresses as pa 
            on pa.p_id = p.id
            where p.id=$1
            group by p.id, p.firstname, p.lastname, p.emailaddresses`,
        [id] 
    )
    return query.rows[0]
}