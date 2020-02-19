

const { top50 } = require('./top50');

// Extract every single iteration and push it to a new array
  let uniqueNames = [];
  let nameCount = [];

for (let elem of top50){
    if (!uniqueNames.includes(elem.artist)){
        uniqueNames.push(elem.artist);
    }
};

// Creating object array 
for ( let name of uniqueNames ){
    nameCount.push({name: name , count : 0 })
}


//Comparing nameCount to top 50 

for ( let elem of nameCount ){
    for( let person of top50){
        if( elem.name === person.artist){
            elem.count ++;
        }
    }
};

nameCount.sort(function(a, b){
    return b.count - a.count;
});

//Step 5 


const popularArtist = top50.filter(obj => obj.artist === nameCount[0].name);

module.exports = popularArtist;
