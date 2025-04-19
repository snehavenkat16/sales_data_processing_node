const multer = require('multer');
const path = require('path');
const fs = require('fs');
const loadCSVData = require('../services/readAndProcessCSV');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // save to 'uploads/' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter function to allow only CSVs
const fileFilter = (req, file, cb) => {
    if (path.extname(file.originalname) !== '.csv') {
        return cb(new Error('Only CSV files are allowed'));
    }
    cb(null, true);
};

// file upload middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('file');

// Function to process the uploaded file
const processFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        console.log(`Processing file: ${filePath}`);

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found after upload.' });
        }

        await loadCSVData(filePath);

        res.status(200).json({ message: 'File uploaded and data processed successfully.' });
    } catch (error) {
        console.error('Error processing file:', error); // More detailed error logging
        res.status(500).json({ error: error.message });
    }
};


module.exports = { upload, processFile };
