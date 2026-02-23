import React, { useState, useEffect } from "react";
import "./App.css";
import { characters } from "./data/characters";
import Card from "./components/Card";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Fisher-Yates Shuffle
  const shuffleCards = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Initial shuffle
  useEffect(() => {
    setShuffled(shuffleCards(characters));
  }, []);

  const handleCardClick = (name) => {
    if (gameOver || gameWon) return;

    if (clicked.includes(name)) {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    const newClicked = [...clicked, name];
    setClicked(newClicked);
    setScore(newClicked.length);
    setShuffled(shuffleCards(characters));

    // Win condition
    if (newClicked.length === characters.length) {
      setGameWon(true);
      setHighScore(characters.length);
    }
  };

  const resetGame = () => {
    setScore(0);
    setClicked([]);
    setGameOver(false);
    setGameWon(false);
    setShuffled(shuffleCards(characters));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Dark Memory Game</h1>
        <h4>"The End Is The Beginning And The Beginning Is The End."</h4>

        <p className="game-instruction">
          Click each character only once. If you click the same character twice, you lose.
        </p>

        <div className="scoreboard">
          <button>Score: {score}</button>
          <button>High Score: {highScore}</button>
        </div>
      </header>

      {gameWon && (
        <div className="win-screen">
          <h2>You Won!</h2>
          <p>Score: {score}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}

      {gameOver && !gameWon && (
        <div className="win-screen">
          <h2>Game Over</h2>
          <p>Score: {score}</p>
          <button onClick={resetGame}>Try Again</button>
        </div>
      )}

      {!gameWon && !gameOver && (
        <main className="card-grid">
          {shuffled.map((char) => (
            <Card
              key={char.name}
              name={char.name}
              image={char.image}
              onClick={handleCardClick}
            />
          ))}
        </main>
      )}
    </div>
  );
}

export default App;