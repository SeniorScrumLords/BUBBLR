const axios = require("axios")
const { MatchGame } = require('../db/index'); 

const API_BASE_URL = "http://127.0.0.1:8080/api";

// Fetch drinks from CocktailDB API
 const fetchDrinks = async () => {
  try {
    // Make direct external API call without going through your own server
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
    );
    return response.data.drinks.slice(0, 8);
  } catch (error) {
    console.error("Failed to fetch drinks:", error);
    return []; // Return empty array instead of throwing error
  }
};

// Fetch match games from the backend
const fetchMatchGames = async () => {
  try {
    const matchGames = await MatchGame.findAll();
    return matchGames;
  } catch (error) {
    console.error("Failed to fetch match games:", error);
    return [];
  }
};


// Create a new match game
const createMatchGame = async (userId, drinkId, imageUrl) => {
  try {
    const newMatchGame = await MatchGame.create({ userId, drinkId, imageUrl });
    return newMatchGame;
  } catch (error) {
    console.error("Failed to create match game:", error);
    throw error;
  }
};


// Update a match game
 const updateMatchGame = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/match-games/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Failed to update match game:", error);
    throw error;
  }
};

// Delete a match game
 const deleteMatchGame = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/match-games/${id}`);
  } catch (error) {
    console.error("Failed to delete match game:", error);
    throw error;
  }
};

module.exports = {
  fetchDrinks,
  deleteMatchGame,
  updateMatchGame,
  createMatchGame,
  fetchMatchGames
}