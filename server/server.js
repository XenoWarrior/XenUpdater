const express = require("express");
const app = express();
const port = 3000;

const multer = require("multer");
const path = require("path");
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${__dirname}\\uploads\\`);
        },
        filename: function (req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        }
    })
});

app.use(express.static(`${__dirname}/public`));

/**
 * Health Check
 * TODO: Scan configurations, check files exist and return status.
 */
app.get("/api/health-check", (req, res) => {
    res.send(JSON.stringify({
        status: 200,
        message: "Server is running"
    }));
})

/**
 * File Upload
 */
app.post("/api/upload", upload.single('package'), function (req, res, next) {
    const file = req.file;

    if (!file) {
        res.contentType("application/json").status(400).send(JSON.stringify({
            status: 400,
            message: "No file selected"
        }, null, 4));
    }

    res.contentType("application/json").status(202).send(JSON.stringify({
        status: 202,
        messsage: "File has been accepted for processing.",
        file: file
    }, null, 4));
});

/**
 * Start server
 */
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});