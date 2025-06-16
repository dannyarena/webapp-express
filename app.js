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
    app.get('/movies/:id', (req, res) => {
        const movieId = req.params.id;
        const sql = `
        SELECT m.*, r.id AS review_id, r.name, r.vote, r.text
        FROM movies m
        LEFT JOIN reviews r ON m.id = r.movie_id
        WHERE m.id = ?
        `;
        db.query(sql, [movieId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Errore nella query' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Film non trovato'});
            }
            const film = {
               id: results[0].id,
                title: results[0].title,
                director: results[0].director,
                genre: results[0].genre,
                release_year: results[0].release_year,
                abstract: results[0].abstract,
                image: results[0].image,
                created_at: results[0].created_at,
                updated_at: results[0].updated_at,
                reviews: []  
            }
            results.forEach(row => {
                if (row.review_id) {
                    film.reviews.push({
                         name: row.name,
                         vote: row.vote,
                         text: row.text
                    });
                }
            })
            res.json(film);
        });
    });

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`)
});