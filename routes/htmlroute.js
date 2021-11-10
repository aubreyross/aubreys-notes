const path = require('path');
const html = require('express').Router();
const app = express();
const express = require('express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

html.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

html.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));


module.exports = html;