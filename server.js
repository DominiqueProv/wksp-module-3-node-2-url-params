'use strict';

const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const { top50 } = require('./data/top50');
const { books } = require('./data/books');
const mostPopularArtist = require('./data/mostPopular')
const PORT = process.env.PORT || 8000;
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
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
        link: `/book/`,
        books,
        type : books.type,
        author: books.author,
        description: books.description,
    });
});

app.get('/bookCat', (req, res) => {
    res.render('pages/bookCat', {
        title: 'Book review 2020',
        link: `/book/`,
        books,
        type : books.type,
        author: books.author,
        description: books.description,
    });
});


app.get('/book/:id', (req, res) => {
    const bookId = req.params.id;
    const filteredBook = books.filter(book => book.id == bookId);
    res.render('pages/bookDetail', {
        title: `${filteredBook[0].title}`,
        filteredBook,
        link: `/bookLibrary`,


    });
});


app.post('/bookfilter', (req,res,) => {
    let type = req.body.book;
     console.log(type);
     let filterdBooks = books.filter(book => book.type === type)
    // const filteredCat = books.filter(book => book.type === type);
    res.render('pages/bookCat', {
        // filteredCat,
        title: 'Some title',
        link: `/book/`,
        books: filterdBooks,
        type : type,
        author: books.author,
        description: books.description,
    })    
}),

// handle 404s
app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
