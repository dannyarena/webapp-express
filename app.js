const express = require('express');
const app = express();
const port = 3000;
const moviesRouter = require('./routers/movies')
app.use(express.json());
app.use('/movies', moviesRouter)





app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`)
});