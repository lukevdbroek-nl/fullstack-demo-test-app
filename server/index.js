const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

const cors = require('cors');
require('dotenv').config();

app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@test-application.7sel4bf.mongodb.net/testappdatabase?retryWrites=true&w=majority&appName=test-application`);

const allowedOrigins = [process.env.ALLOWED_LOCAL_DEBUG_ORIGIN, process.env.ALLOWED_PROD_ORIGIN];
app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use((req, res, next) => {
    const key = req.header('x-api-key');
    if(key && key === process.env.SERVER_MAIN_API_KEY) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
});

fs.readdirSync(path.join(__dirname, 'api')).forEach(file => {
    const filePath = path.join(__dirname, 'api', file);
    if (fs.lstatSync(filePath).isFile()) {
        const functionName = file.replace(/\.[^/.]+$/, ''); // Strip file extension
        const functionHandler = require(filePath);
        app.get(`/api/${functionName}`, functionHandler);
    }else{
        console.log('Failed to add this API endpoint: ' + file);
    }
});

app.listen(process.env.PORT, () => {
    console.log('server runs on port ' + process.env.PORT);
});