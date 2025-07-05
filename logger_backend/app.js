const express = require('express');
const cors = require('cors');

const logRoutes = require('./src/routes/logs');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/',logRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        error: true,
        message: 'Route not found',
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        error: true,
        message: err.message,
    });
});


module.exports = app;