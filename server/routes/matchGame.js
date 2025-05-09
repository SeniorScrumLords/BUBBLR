const express = require('express');
const router = express.Router();
const { MatchGame } = require('../db/index');
const {fetchDrinks, deleteMatchGame, updateMatchGame, createMatchGame, fetchMatchGames,} = require('../api/MatchGameApi');

// Create a new match game
router.post('/', (req, res) => {
  const { userId, drinkId, imageUrl } = req.body;

  if (!userId || !drinkId || !imageUrl) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  createMatchGame(userId, drinkId, imageUrl)
    .then((cMatch) => {
      res.status(201).json(cMatch);
    })
    .catch((err) => {
      console.error("Error creating match game:", err);
      res.status(500).json({ error: err.message });
    });
});

// Fetch all match games
router.get('/mGames', (req, res) => {
  fetchMatchGames()
    .then((match) => {
      res.status(200).send(match);
    })
    .catch((err) => {
      console.error('Error fetching match games:', err);
      res.sendStatus(500);
    });
});

// Fetch drinks
router.get("/search", async (req, res) => {
  try {
    const drinks = await fetchDrinks();
    res.status(200).json(drinks); // Send JSON response
  } catch (err) {
    console.error("Error fetching drinks:", err);
    res.status(500).json({ error: "Failed to fetch drinks" });
  }
});
// Update a match game
router.put('/match-games/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  updateMatchGame(id, updatedData)
    .then((updatedMatch) => {
      res.status(200).send(updatedMatch);
    })
    .catch((err) => {
      console.error('Error updating match game:', err);
      res.sendStatus(500);
    });
});

// Delete a match game
router.delete('/match-games/:id', (req, res) => {
  const { id } = req.params;
  deleteMatchGame(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error('Error deleting match game:', err);
      res.sendStatus(500);
    });
});


// GET all match games
router.get('/', async (req, res) => {
  try {
    const matchGames = await MatchGame.findAll();
    res.json(matchGames);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch match games' });
  }
});


// DELETE match game
router.delete('/:id', async (req, res) => {
  try {
    const matchGame = await MatchGame.findByPk(req.params.id);
    if (!matchGame)
      return res.status(404).json({ error: 'MatchGame not found' });

    await matchGame.destroy();
    res.json({ message: 'MatchGame deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete match game' });
  }
});

module.exports = router;
