
const rp = require ( 'request-promise' );

const orgArr = new Array ();
let r1;
/*
 Report module controller
 */
module.exports = {

	mainReport: ( req, res, next ) => {
		try {
			if ( isNaN ( req.params.idstart ) ) {
				throw ('Invalid idstart');
			}

			let options = {
				method : 'POST',
				json   : true,
				uri    : '[endopint scrubbed, obtain via WSD]',
				headers: {
					Accept: 'application/json'
				},
				body   : {
					client_id    : 'service_desk_toolkit',
					client_secret: '[secret scrubbed, obtain via WSD]',
					grant_type   : 'client_credentials'
				}
			};

			/***
			 *call the function and use the variables passed into the foo function handler (from initial server call)
			 */
			rp ( options )
			.then ( r => {

				r1 = r.access_token;

				for ( var x = req.params.idstart; x <= req.params.idfinish; x++ ) {

					let options2 = {
						method : 'GET',
						json   : true,
						uri    : '[endopint scrubbed, obtain via WSD]' + x + '?limit=1',
						headers: {
							Authorization: 'Bearer ' + r1  //access token received
						}
					};

					orgArr.push ( options2 );

				}

				return Promise.all ( orgArr ); //pass this back to handler to be used
			} )
			.then ( orgArr => {   
				let reportLogic = require ( '../services/main-report-logic' );

				reportLogic.executeRPChain(req, res, next, options, rp, orgArr, r1);
			} );

		} catch ( e ) {
			console.log ( e );
			return next ( e );
		}
	}

}