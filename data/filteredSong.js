const { top50 } = require('./top50');

let songNumber = 24;
const filteredSong = top50.filter(song => song.rank == songNumber);

console.log(filteredSong);