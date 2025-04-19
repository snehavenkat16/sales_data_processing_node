const express = require('express');
const uploadRouter = express.Router();
const { upload, processFile } = require('../controllers/uploadController');

// POST route to upload CSV file
uploadRouter.post('/', upload, processFile);  // The 'upload' middleware handles the file upload, and 'processFile' processes it

module.exports = uploadRouter;
