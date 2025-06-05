import React, { useState, useEffect } from "react";
import "./App.css";
import { characters } from "./data/characters";
import Card from "./components/Card";

function App() {
  const [score, setScore] = useState(0);
  const [record, setRecord] = useState(0);
  const [clickedCharacters, setClickedCharacters] = useState([]);
  const [shuffledCharacters, setShuffledCharacters] = useState([]);

  const handleCardClick = (name) => {
    if (clickedCharacters.includes(name)) {
      if (score > record) setRecord(score);
      setScore(0);
      setClickedCharacters([]);
    } else {
      setScore(score + 1);
      setClickedCharacters([...clickedCharacters, name]);
    }
  };

  // Shuffle whenever clickedCharacters changes
  useEffect(() => {
    const shuffleCharacters = (array) => {
      return array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
    };

    setShuffledCharacters(shuffleCharacters(characters));
  }, [clickedCharacters]); // Triggers after every click

  return (
    <div className="app">
      <header className="header">
        <h1>Dark Memory Game</h1>
        <h4>"The End Is The Beginning And The Beginning Is The End."</h4>
        <div className="scoreboard">
          <button>Score: {score}</button>
          <button>High Score: {record}</button>
        </div>
      </header>
      <main className="card-grid">
        {shuffledCharacters.map((char) => (
          <Card
            key={char.name}
            name={char.name}
            image={char.image}
            onClick={handleCardClick}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
