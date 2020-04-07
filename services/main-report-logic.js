
//declare variables
const fs = require ( 'fs-extra' );
const async = require ( 'async' );

const productsArr = new Array ();
const luidArr = new Array ();

module.exports = {

	executeRPChain: ( req, res, next, options, rp, orgArr, r1 ) => {
		                                                                     
		return new Promise ( ( resolve, reject ) => { //promisfy the async
			
			async.eachLimit ( orgArr, 10, ( page, callback ) => {
				
				//begin request-promise chain
				rp ( page )
					.then ( respo1 => {

						let totalCount = respo1.totalCount; //look at the total count within the response
						let prodOrgID;

						respo1.products.forEach ( ( element, index ) => {
							prodOrgID = element.orgId;
						} );

						/***
						 * Step 2 - begin pagination process
						 */
						let i = 0;
						let stepsize = Math.ceil ( totalCount / 10 ); //makes sure increments are always in groups of 10

						while ( i < totalCount ) {

							// set the get options using the offet & limit query parameters
							let options3 = {
								method : 'GET',
								json   : true,
								uri    : '[endopint scrubbed, obtain via WSD]' + prodOrgID,
								headers: {
									Authorization: 'Bearer ' + r1  //access token received
								},
								qs     : {
									offset: i,
									limit : stepsize
								}
							};

							i = i + stepsize; //increment by step size

							productsArr.push ( rp ( options3 ) ); //API call code here

							if ( i < stepsize + 1 ) {
								i++; //This avoids duplicates
							}

						}

						return Promise.all ( productsArr ); // wait for all items to finish then pass this out as the result

					} )
					.then ( respo2 => {
						/***
						 * Step 3 - return all products with identifers beginning with "lu"
						 */
						respo2.forEach ( ( element ) => {
							let products = element.products;

							products.forEach ( ( product ) => {

								if ( product.identifier.toLowerCase ().substring ( 0, 2 ) == 'lu' ) {
									luidArr.push ( product );

								}

							} );
						} );

						respo3 = luidArr;

						let jsonObj = {} // empty Object
						jsonObj[ 'product' ] = [];

						// let temp = 1;

						respo3.forEach ( ( element, index ) => {
							jsonObj[ 'product' ].push ( {
								org_id: element.orgId,
								id    : element.identifier
							} );
						} );

						// Save the report to file system, labelled by the request’s UUID.
						return new Promise ( ( resolve, reject ) => {
							fs.outputJson ( __dirname + '/reports/client-report-' + req.id + '.json', jsonObj, ( err ) => {
								//handling error
								if ( err ) {
									return reject ( 'Unable to save to directory: ' + err );
								}

								return resolve ();
							} );
						} );
					} )
					.then ( () => callback () )
					.catch ( ( err ) => {
						console.log ( `Error running report: ${err.message || err.error || err.toString ()} request ID: ${req.id}` );
						return callback ();
					} );
			}, e => {
				if ( e ) {
					return reject ( e );
				} else {
					return resolve ();
				}
			} );

		} )
		.then ( () => res.send ( 'Done' ) )
		.catch ( err => next ( err.message || err.error || err.toString () ) );
			
	}
}