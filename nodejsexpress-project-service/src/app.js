const express = require('express');
const cors = require('cors');

const projectRoutes = require('./routes/projectRoutes');

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/projects', projectRoutes);

module.exports = app;