const api = require("express").Router();
//uuid npm package for unique id 
const {v4: uuidv4 } = require ('uuid');
//import from fs.utils.js file 
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsutils');
// let DB = ("./db/db.json");


//GET route for content of notes in /db/db.json 
api.get('/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


//POST route to create note
api.post('/notes', (req, res) => {
  console.info(`${req.method} request received`)
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {

    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Succesful Note`);
  } else {
    res.error('Error');
  }
});

//DELETE route to delete selected note
api.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
      readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {

        const result = json.filter((title) => title.id !== noteId);
        writeToFile('./db/db.json', result);
        res.json(`Note deleted`);
  });
});


module.exports = api;
