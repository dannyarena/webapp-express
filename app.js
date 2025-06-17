const express = require('express');
const app = express();
const port = 3000;
const moviesRouter = require('./routers/movies')
app.use(express.json());
app.use('/movies', moviesRouter)

// Middleware per rotte non trovate
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Rotta non trovata'
    });
});

// Middleware per la gestione degli errori interni
app.use((err, req, res, next) => {
    console.error('Errore interno:', err);

    res.status(500).json({
        error: 'Si è verificato un errore interno'
    });
});


app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`)
});