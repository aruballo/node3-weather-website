const request = require('request');

const forecast = function(latitude, longitude,  cb) {
    const url = `https://api.darksky.net/forecast/1ab1da71fdb4af79d165db7d77e49a39/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            cb('Unable to connect to darsky service');
        } else if (body.error) {
            cb('Darksky returned an error: ', body.error);
        } else {
            const {currently, daily} = body;
            
            cb(undefined, `It is currently ${currently.temperature} degrees celsius out. There is a ${currently.precipProbability}% chance of rain. \n ${daily.data[0].summary} \n ${daily.summary}`);
        }
    })
}

module.exports = forecast;