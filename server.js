// Requires the following npm modules & dependencies 
const express = require ('express');
//uuid npm package for unique id 
const {v4: uuidv4 } = require ('uuid');
//import node path to indicate paths of routes
const path = require ('path');

const fs = require('fs');

// Express app configuration
const app = express();
//port to listen on for requests
const PORT = process.env.PORT || 3001;

// Express middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Importing routes
const apiRouter = require('./routes/apiroute.js');
const htmlRouter = require('./routes/htmlroute.js');

app.use ('/api', apiRouter);
app.use ('/', htmlRouter);


// GET Routes to indicate where we're going to provide files and their location on our server's filesystem
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//Home page
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//Note page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

//Wildcard 
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

//Server accepts which port to listen on
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));