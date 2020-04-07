
// Configure app and router
const express = require ( 'express' );
const app = express ();
const router = express.Router ();


// API Module Routes
require ( __dirname + `/api/routes/report` ) ( app, router );
