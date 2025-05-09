import React from 'react';

const GameGrid = ({
  shuffledTiles,
  flipped,
  solved,
  handleClick,
  moves,
  resetGame,
  goToUploadScreen,
}) => {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 120px)', // Increased tile size
          gap: '10px',
          justifyContent: 'center',
          margin: '20px auto',
        }}
      >
        {shuffledTiles.map((tile, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: '120px', // Increased tile size
              height: '120px', // Increased tile size
              perspective: '1000px',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                transform:
                  flipped.includes(index) || solved.includes(index)
                    ? 'rotateY(180deg)'
                    : 'rotateY(0)',
              }}
            >
              {/* Front of the tile (gray background with question mark) */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  backfaceVisibility: 'hidden',
                  backgroundColor: 'gray',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                ?
              </div>

              {/* Back of the tile (image with thicker orange border and no gap) */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  backfaceVisibility: 'hidden',
                  borderRadius: '5px',
                  transform: 'rotateY(180deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: solved.includes(index)
                    ? '4px solid green'
                    : '4px solid orange', // Thicker border
                  boxSizing: 'border-box', // Ensures the border is included in the element's dimensions
                  overflow: 'hidden', // Ensures the image doesn't overflow the container
                }}
              >
                <img
                  src={tile.imageUrl}
                  alt={tile.name}
                  style={{
                    width: '100%', // Image fills the entire container
                    height: '100%', // Image fills the entire container
                    objectFit: 'cover', // Ensures the image covers the area without distortion
                    borderRadius: '5px', // Matches the container's border radius
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>Moves: {moves}</p>

      {/* Buttons Container */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        {/* Reset Game Button */}
        <button
          onClick={resetGame}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#6b0042', // Default color
            color: 'rgb(255, 186, 15)', // Text color
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease', // Smooth transition for hover effect
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#8b0052')} // Hover color
          onMouseOut={(e) => (e.target.style.backgroundColor = '#6b0042')} // Default color
        >
          Reset Game
        </button>

        {/* Edit Images Button */}
        <button
          onClick={goToUploadScreen}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#6b0042', // Same as Reset Game button
            color: 'rgb(255, 186, 15)', // Text color
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease', // Smooth transition for hover effect
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#007bff')} // Hover color (blue)
          onMouseOut={(e) => (e.target.style.backgroundColor = '#6b0042')} // Default color
        >
          Edit Images
        </button>
      </div>

      {/* End Game Condition */}
      {solved.length === shuffledTiles.length && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>Game Over! 🎉</p>
      )}
    </div>
  );
};

export default GameGrid;
