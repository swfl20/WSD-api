
/*
 Version 1.0 The report module
 */

const port = 3000;

module.exports = ( server, router ) => {

	let reportController = require ( '../controllers/report' );
	let uuidController = require ( '../controllers/uuid' );
	let fileManagementController = require ( '../controllers/fileManage' );

	//Home page
	router.get ( '/', ( req, res ) => {
		res.send ( 'API Home' );
	} );

	//Run "the report" from task 1
	router.get ('/report/:idstart/:idfinish/', [
		uuidController.getuuid,
		reportController.mainReport
	]  );

	//List all reports (essentially just a list of filenames – creation dates are optional)
	router.get ('/listall/', [
		fileManagementController.listAllReport
	]  );

	//Show one report
	router.get ('/list/:repIndex/', [
		fileManagementController.showOneReport
	]  );

	//Delete one report
	router.get ('/delete/:repIndex/', [
		fileManagementController.deleteOneReport
	]  );

	//Delete all report
	router.get ('/deleteall/', [
		fileManagementController.deleteAllReport
	]  );

	server.listen ( port, () => console.log ( `Listening on port ${port}` ) );

	server.use('/', router);
};