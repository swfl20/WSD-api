
/*
 File Management module controller to list all client reports
 */
const fs = require ( 'fs-extra' );
const filesArr = new Array ();

module.exports = {

	listAllReport: ( req, res, next ) => {
		
		//List all reports (essentially just a list of filenames – creation dates are optional)
		fs.readdir ( __dirname + '/../services/reports', ( err, files ) => {
			//handling error
			if ( err ) {
				console.log ( 'Unable to scan directory: ' + err );
				return next ( 'Unable to scan directory: ' + err );
			}

			//listing all files using forEach
			files.forEach ( ( file, index ) => {
				filesArr.push ( {
					id      : index,
					filename: file
				} );
			} );

			res.json ( filesArr );
		} );
	},

	showOneReport: ( req, res, next ) => {
		
		fs.readdir ( __dirname + '/../services/reports', ( err, files ) => {

			//handling error
			if ( err ) {
				console.log ( 'Unable to scan directory: ' + err );
				return next ( 'Unable to scan directory: ' + err );
			}

			//listing all files using forEach
			files.forEach ( ( file, index ) => {
				filesArr.push ( file );
			} );

			//Read desired report
			if ( !isNaN ( req.params.repIndex ) && req.params.repIndex <= filesArr.length ) {
				fs.readJson (  __dirname + '/../services/reports/' + filesArr[ req.params.repIndex ], ( err, data ) => {
					//handling error
					if ( err ) {
						return console.log ( 'Unable to list report: ' + err );
					}

					res.send ( data );
				} );
			} else {
				res.status ( 404 ).send ( 'Please enter a numeric value between 0 - ' + filesArr.length + ' as a 3rd parameter' );
			}
		} );
	},

	deleteOneReport: ( req, res, next ) => {

		fs.readdir ( __dirname + '/../services/reports', ( err, files ) => {

			//listing all files using forEach
			files.forEach ( ( file, index ) => {
				filesArr.push ( file );
			} );

			//handling error
			if ( err ) {
				return console.log ( 'Unable to delete report: ' + err );
			}

			//Delete desired report
			if ( !isNaN ( req.params.repIndex ) && req.params.repIndex <= filesArr.length ) {
				fs.remove (  __dirname + '/../services/reports/' + filesArr[ req.params.repIndex ], ( err, data ) => {
					//handling error
					if ( err ) {
						return console.log ( 'Unable to delete all reports: ' + err );
					}

					//Delete one report
					res.send ( 'deleted one report' );
				} );
			} else {
				res.status ( 404 ).send ( 'Please enter a numeric value between 0 - ' + filesArr.length + ' as a 3rd parameter' );
			}
		} );
	},

	deleteAllReport: ( req, res, next ) => {

		fs.removeSync ( __dirname + '/../services/reports' );
		//Delete all reports
		res.send ( 'deleted all reports' );

	}
}