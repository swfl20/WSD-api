
//declare misc. global constiables
const uuid = require ( 'node-uuid' );

/*
 Report module controllers
 */
module.exports = {

	getuuid: ( req, res, next ) => {

		req.id = uuid.v4 (); //The UUID should be attached to the express req object.

		//Request UUID should be included in the response as a header - f12 developer -> network ->header in browser shows
		// as intended ✓
		res.setHeader ( "my-test--uuid", req.id );
		next ();
	}

}