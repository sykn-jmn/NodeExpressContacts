const db = require("./dbPool")

module.exports = async(id) => {
    const query = await db.query(
        `select 	p.p_id id,
		    p.firstname, 
		    p.lastname, 
		    p.emailaddresses,
		    json_agg(
			json_build_object(
				'id', pa.pa_id,
				'street', pa.street,
				'city', pa.city,
				'zipcode', pa.zipcode
			) 
            )postaladdresses
            from people as p 
            left join postaladdresses as pa 
            on pa.p_id = p.p_id
            where p.p_id=$1
            group by p.p_id, p.firstname, p.lastname, p.emailaddresses`,
        [id] 
    )
    return query.rows[0]
}