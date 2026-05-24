const express = require('express');

const projectRoutes = require('./routes/projectRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/projects', projectRoutes);

module.exports = app;