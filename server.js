const express = require('express');
const mysql = requier('mysql2');

const app = express();
const PORT = process.env.PORT ||3001;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const db = mysql.createConntection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Collier$123',
        database: 'movies_db'
    },
    console.log('Connected to movies database');
)
