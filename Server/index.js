//connect to port

require("dotenv").config();
const express = require("express");
var morgan = require('morgan');
const path = require("path");
const PORT = 3000;
const db = require('./database/db');
const getGameController = require('./controllers/games');
const cors = require('cors');
const initializer = require('./database/populate.js');
const {getUserCollections, getCollectionGames} = require("./controllers/collections");

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

const dummydata = {
    "uid":"yElHRF2wa2NDBQ9myvTXVEd60Tt2",
    "email":"admin@tabletop.com",
    "fullname": "Samantha Johnson",
    "username": "SamPlayzGames",
    "age": 28,
    "preferred_playstyle": "Strategic and Competitive",
    "favorite_mythical_creature": "Dragon",
    "favorite_board_game": "Catan (Settlers of Catan)",
    "favorite_category": "Eurogames"
  }

//initializer.populateBoardGames();

app.get('/game', function(req, res) {
  getGameController.getGame(req, res);
});

app.post('/users', function(req, res) {
  usersController.createUser(req, res);
})

app.get('/users', function(req, res) {
  console.log(req.query.uid)
  res.status(200).send(dummydata)
  // usersController.getUser(req, res);
})

app.get('/collections', async (req, res, next) => {
  try{
    const collections = await getUserCollections(req.query.userId);
    res.send(collections)

  } catch(err) {
    req.sendStatus(500);
  }
});

app.get('/collections/:collectionId/games', async (req, res, next) => {
  try {
    const collectionGames = await getCollectionGames(req.params.collectionId);
    res.send(collectionGames);
  } catch(err) {
    req.sendStatus(500);
  }
});



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})
