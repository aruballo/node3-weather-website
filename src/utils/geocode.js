const request = require('request');

const geocode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJ1YmFsbG9zIiwiYSI6ImNqdWFyZmdoMzA1cHkzeW55YTNvbzAxMWwifQ.W54MnXj2Iu0z-pl1OtMF3w&limit=1`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            cb('Unable to connect to location services!');
        } else if (body.features.length < 1) {
            cb('Mapbox returned 0 results for the search query');
        } else {
            const {center, place_name: location} = body.features[0];

            cb(undefined, { 
                longitude: center[0],  
                latitude: center[1], 
                location
            });
        }
    })
}


module.exports = geocode;