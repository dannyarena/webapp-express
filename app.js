const mysql = require('mysql2');
const express = require('express');
const app = express();
require ('dotenv').config();
const port = 3000;
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.log('Errore di connessione al database', err);
    } else {
        console.log('Connesso al database MySQL');
    }
});

app.get('/movies', (req, res) => {
    const sql = 'SELECT * FROM movies';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nella query' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`)
});