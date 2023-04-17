const express = require('express');
const app = express();
const mysql = require('mysql2');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movies_db'
},
console.log('Connected to movies database')
);

//Gets all of the movies:
app.get('/api/movies', (req, res) => {
    try{
        db.query(`SELECT id, movie_name AS title FROM movies`, function (err, results){
            res.status(200).json(results);
        })
    }catch(err){
        res.status(500).json(err);
    }
});
//Creates a movie:
app.post('/api/new-movie', ({body}, res) => {
    try{
        const movieParam = [body.movie_name];
        db.query(`INSERT INTO movies (movie_name) VALUES (?)`, movieParam, function(err, result){
            if(err){
                res.status(404).json({message: 'Cannot post the movie'});
            }
            res.json({message:'Movie was posted', data: body});
        })
    } catch(err){
        res.status(500).json(err);
    }
})
// Deletes a movie:
app.delete('/api/movies/:id', (req, res) => {
    try{
        const movieParam = [req.params.id];
        db.query(`DELETE FROM movies WHERE id = ?`, movieParam, function(err, result){
            res.status(200).json({message: 'Movie deleted'});
        })
    } catch(err){
        res.status(500).json(err);
    }
})
// Get all movie reviews
app.get('/api/reviews', (req, res) => {
    try{
        db.query(`SELECT movies.movie_name as movie, reviews.review FROM reviews JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name`, (err, rows) =>{
            res.status(200).json(rows);
        })
    } catch(err){
        res.status(500).json(err);
    }
})
//Update a review name:
app.put('/api/reviews/:id', (req, res) => {
    try{
        let reqParams = [req.body.review, req.params.id];
        db.query(`UPDATE reviews SET review = ? WHERE id = ?`, reqParams, (err, results) => {
            res.status(200).json(results);
        })
    } catch(err){
        res.status(500).json(err);
    }
})

//Sends 404 page:
app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})