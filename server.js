'use strict';

const morgan = require('morgan');
const express = require('express');
const { top50 } = require('./data/top50');
const mostPopularArtist = require('./data/mostPopular')
const PORT = process.env.PORT || 8000;
const app = express();


app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// endpoints here



app.get('/top50', (req, res) => {
    res.render('pages/top50', {
        title: 'Top 50 Songs Streamed on Spotify',
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
        // link: ``
        filteredSong
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
