const express = require('express')

const app = express()


// Default landing endpoint
app.use('/', (req, res, next) => res.status(200).json({ message: 'Welcome to This-APP.' }));

module.exports = app;