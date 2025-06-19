const db = require ('../data/db');

function getAllMovies(req, res) {
    const sql = 'SELECT * FROM movies';

    db.query(sql, (err, results) => {
        if (err) {
            return next(err);
        }
        res.json(results);
    });
}

function getMovieById(req, res) {
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
}

function addReview(req, res) {
    const movieId = req.params.id;
    const { name, vote, text } = req.body;

    const sql = `
    INSERT INTO reviews (name, vote, text, movie_id)
    VALUES (?, ?, ?, ?)
    `

    db.query(sql, [name, vote, text, movie_id], (err, result) => {

    });

    if (err) {
        console.error("Errore nell'inserimento;", err);
        return res.status(500).json({ error: "Errore nel salvataggio"});
    }

    res.status(201).json({
        message: "Recensione salvata con successo",
        insertId: result.insertId
    });
}

module.exports = {
    getAllMovies,
    getMovieById
};