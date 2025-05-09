import React, { useState, useEffect } from "react";
import UploadScreen from "./UploadScreen";
import GameGrid from "./GridGame";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MemoryMatch = ({ googleId }) => {
  const [shuffledTiles, setShuffledTiles] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [match, setMatch] = useState([]);
  const [customImages, setCustomImages] = useState(Array(8).fill(null));
  const [showGameGrid, setShowGameGrid] = useState(false);
  const [matchGameId, setMatchGameId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Define fallback images
  const fallbackImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE5Tc7qlEOQIvCm10G0J1E9FGWuw7xh7HV9g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb1WtLPgV2AUyuwe-I9vzRHnRrKME8rpciVw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFDks5Rx4bZQFnVI5qAuLlFHI_BTFy5nv3FQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfclwOdfW3ZSsOo0xIju4O-W2cJTvR1cUh2w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL0XfC6uez2H_UGolAKhXwKp_2e5o_yTHXsA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxhUQMLb3CWC17YT9M4KBtaWwoJJ1mb_kgvA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS3Nk5--pEptGU_oRHAVV4WViKWEaIrGGvgw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWTIAmyaU220Z44Pz4YieYufBmQIbUlDuotA&s",
  ];

  // Fetch match games
  const getMatch = () => {
    axios
      .get("/api/match-games/mGames")
      .then((response) => {
        setMatch(response.data);
      })
      .catch((err) => {
        console.error("Error fetching matches:", err);
      });
  };

  // Fetch drinks
  const getDrinks = async () => {
    try {
      const response = await axios.get("/api/match-games/search");
      const drinks = response.data || [];
      setDrinks(drinks);
      return drinks;
    } catch (err) {
      console.error("Error fetching drinks:", err);
      return [];
    }
  };

  // Create a new match game
  const createMatchGame = async (userId, drinkId, imageUrl) => {
    try {
      const response = await axios.post("/api/match-games", {
        userId,
        drinkId,
        imageUrl,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to create match game:", error);
      throw error;
    }
  };

  // Update a match game
  const updateMatchGame = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/match-games/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Failed to update match game:", error);
      throw error;
    }
  };

  // Delete a match game
  const deleteMatchGame = async (id) => {
    try {
      await axios.delete(`/api/match-games/${id}`);
    } catch (error) {
      console.error("Failed to delete match game:", error);
      throw error;
    }
  };

  useEffect(() => {
    getMatch();
  }, []);

  useEffect(() => {
    getDrinks();
  }, []);

  // Generate a unique default image URL for each pair of tiles
  const assignedImages = new Set();

  const generateDefaultImageUrl = () => {
    // Filter out images that are already assigned
    const availableImages = fallbackImages.filter(img => !assignedImages.has(img));

    // If all images are used, reset the assigned set
    if (availableImages.length === 0) {
      assignedImages.clear();
    }

    // Pick a random image from the remaining pool
    const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];

    // Mark the image as assigned
    assignedImages.add(randomImage);

    return randomImage;
  };

  // Initialize the game with fetched drink data or custom images
  const initializeGame = (data) => {
    // Create an array of unique items (custom images or drinks)
    const uniqueItems = customImages.map((image, index) =>
      image
        ? { id: index, name: "Custom", imageUrl: image }
        : data[index]
        ? {
            id: index,
            name: data[index].strDrink || "Default",
            imageUrl: data[index]?.strDrinkThumb || generateDefaultImageUrl(),
          }
        : { id: index, name: "Default", imageUrl: generateDefaultImageUrl(index) }
    );

    // Ensure we have exactly 8 unique items
    const finalItems = uniqueItems.slice(0, 8);

    // Create pairs by duplicating each item
    const pairs = finalItems.flatMap((item) => [
      { ...item, pairId: item.id }, // Add a pairId to identify the pair
      { ...item, pairId: item.id }, // Duplicate the item with the same pairId
    ]);

    // Shuffle the pairs
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setShuffledTiles(shuffled);
  };

  // Handle tile click
  const handleClick = (index) => {
    if (flipped.includes(index) || solved.includes(index) || isChecking) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setTimeout(() => {
        const [firstIndex, secondIndex] = newFlipped;
        if (shuffledTiles[firstIndex].pairId === shuffledTiles[secondIndex].pairId) {
          setSolved((prevSolved) => [...prevSolved, firstIndex, secondIndex]);
        }
        setFlipped([]);
        setMoves((prevMoves) => prevMoves + 1);
        setIsChecking(false);

        // Update the match game with the new number of moves
        if (matchGameId) {
          updateMatchGame(matchGameId, { moves: moves + 1 });
        }
      }, 1000);
    }
  };

  // Reset the game
  const resetGame = async () => {
    try {
      const drinksData = await getDrinks();
      if (!drinksData || drinksData.length === 0) {
        console.error("No drinks data available");
        return;
      }

      setFlipped([]);
      setSolved([]);
      setMoves(0);
      setIsChecking(false);

      // Delete the current match game and create a new one
      if (matchGameId) {
        await deleteMatchGame(matchGameId);
      }

      // Reinitialize the game with new shuffled tiles
      initializeGame(drinksData);

      const newMatchGame = await createMatchGame(
        googleId,
        drinksData[0]?.idDrink,
        customImages[0] || generateDefaultImageUrl()
      );
      setMatchGameId(newMatchGame.id);
    } catch (error) {
      console.error("Failed to reset game:", error);
    }
  };

  // Handle image upload for a specific tile
  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newCustomImages = [...customImages];
      newCustomImages[index] = imageUrl;
      setCustomImages(newCustomImages);
    }
  };

  // Handle image deletion for a specific tile
  const handleImageDelete = (index) => {
    const newCustomImages = [...customImages];
    newCustomImages[index] = null;
    setCustomImages(newCustomImages);
  };

  // Start the game with uploaded images
  const startGame = async () => {
    try {
      // Check if at least one custom image has been uploaded
      const hasCustomImages = customImages.some((image) => image !== null);

      if (!hasCustomImages) {
        alert("Please upload at least one image before starting the game.");
        return;
      }

      const drinksData = await getDrinks();
      if (!drinksData || drinksData.length === 0) {
        console.error("No drinks data available");
        return;
      }

      initializeGame(drinksData);
      setShowGameGrid(true);

      // Create a new match game
      const newMatchGame = await createMatchGame(
        googleId,
        drinksData[0]?.idDrink,
        customImages[0] || generateDefaultImageUrl(0)
      );
      setMatchGameId(newMatchGame.id);
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  };

  // Start the game with default images
  const startGameWithDefault = async () => {
    try {
      setCustomImages(Array(8).fill(null));
      const drinksData = await getDrinks();
      if (!drinksData || drinksData.length === 0) {
        console.error("No drinks data available");
        return;
      }

      setDrinks(drinksData);
      setShowGameGrid(true);

      // Create a new match game
      const newMatchGame = await createMatchGame(
        googleId,
        drinksData[0]?.idDrink,
        generateDefaultImageUrl(0)
      );
      setMatchGameId(newMatchGame.id);
    } catch (error) {
      console.error("Failed to start game with default images:", error);
    }
  };

  // Go back to the upload screen
  const goToUploadScreen = async () => {
    setShowGameGrid(false);

    // Delete the current match game
    if (matchGameId) {
      await deleteMatchGame(matchGameId);
    }
  };

  // Fetch drinks and match games when the component mounts
  useEffect(() => {
    const initialize = async () => {
      try {
        const drinksData = await getDrinks();
        setDrinks(drinksData);
        initializeGame(drinksData);
        await getMatch();
      } catch (error) {
        console.error("Failed to initialize game:", error);
      }
    };
    initialize();
  }, []);

  // Check if the game is completed
  useEffect(() => {
    if (solved.length === shuffledTiles.length && shuffledTiles.length > 0) {
      setShowModal(true);
    }
  }, [solved, shuffledTiles]);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      {console.log("drinks", drinks)}
      {console.log("matches", match)}
      <h1>Memory Match Game</h1>
      <p>Welcome, {googleId}!</p>

      {!showGameGrid ? (
        <UploadScreen
          customImages={customImages}
          handleImageUpload={handleImageUpload}
          handleImageDelete={handleImageDelete}
          startGame={startGame}
          startGameWithDefault={startGameWithDefault}
        />
      ) : (
        <GameGrid
          shuffledTiles={shuffledTiles}
          flipped={flipped}
          solved={solved}
          handleClick={handleClick}
          moves={moves}
          resetGame={resetGame}
          goToUploadScreen={goToUploadScreen}
        />
      )}

      {/* Game Over Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Congratulations! You've completed the game in {moves} moves.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { setShowModal(false); resetGame(); }}>
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemoryMatch;