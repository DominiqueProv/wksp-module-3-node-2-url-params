'use strict';


const morgan = require('morgan');
const express = require('express');
const { top50 } = require('./data/top50');
const { books } = require('./data/books');
const mostPopularArtist = require('./data/mostPopular')
const PORT = process.env.PORT || 8000;
const app = express();


app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// endpoints here



app.get('/', (req, res) => {
    res.render('pages/top50', {
        title: 'Top 50 Songs Streamed on Spotify',
        link: `/top50/song/`,
        top50: top50,
    });
});

app.get('/top50/popular-artist', (req, res) => {
    res.render('pages/popularArtists', {
        title: 'Most popular artists',
        mostPopularArtist: mostPopularArtist,
    });
});


app.get('/top50/song/:number', (req, res) => {
    const songNumber = req.params.number;
    const filteredSong = top50.filter(song => song.rank == songNumber);
    res.render('pages/songByRank', {
        title: `Song#${filteredSong[0].rank}`,
        filteredSong
    });
});


app.get('/bookLibrary', (req, res) => {
    res.render('pages/bookLibrary', {
        title: 'Book review 2020',
        link: `/library/book/`,
        books,
        type : books.type,
        author: books.author,
        description: books.description,
    });
});


app.get('/books/:number', (req, res) => {
    const bookNumber = req.params.number;
    const filteredBook = books.filter(book => book.id == bookNumber);
    res.render('pages/bookById', {
        title: `Book#${filteredBook[0].id}`,
        filteredBook
    });
});


// handle 404s
app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
