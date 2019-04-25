const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve 
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'WEATHER',
        name: 'Antonio'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT',
        name: 'Antonio',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        name: 'Antonio',
        message: 'This is the help page.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
       if (error) {
           return res.send({
               error
           })
       } 

       forecast(latitude, longitude, (error, forecastData) => {
           if (error) {
               return res.send({
                   error,
               })
           }

           res.send({
               forecast: forecastData,
               location, 
               address: req.query.address
           });
       })
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    }
        
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Antonio',
        message: 'HELP PAGE NOT FOUND'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Antonio',
        message: 'PAGE NOT FOUND'
    });
});

app.listen(3000, () => {
    console.log('SERVER UP DOOE AT 3000');
});