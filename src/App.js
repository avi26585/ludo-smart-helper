import React, { useState } from 'react';
import './styles.css';

const BOARD_SIZE = 15;
const SAFE_ZONES = [0, 8, 13, 21, 26, 34, 39, 47];

function App() {
  const [board, setBoard] = useState(Array(BOARD_SIZE * BOARD_SIZE).fill(''));
  const [dice, setDice] = useState(1);
  const [yourTokens, setYourTokens] = useState([]);
  const [oppTokens, setOppTokens] = useState([]);
  const [suggestion, setSuggestion] = useState('');

  const handleCellClick = (index) => {
    const newBoard = [...board];
    if (newBoard[index] === '') {
      newBoard[index] = 'A';
      setYourTokens([...yourTokens, index]);
    } else if (newBoard[index] === 'A') {
      newBoard[index] = 'O';
      setYourTokens(yourTokens.filter(i => i !== index));
      setOppTokens([...oppTokens, index]);
    } else {
      newBoard[index] = '';
      setOppTokens(oppTokens.filter(i => i !== index));
    }
    setBoard(newBoard);
  };

  const suggestMove = () => {
    let best = -1, pri = -1;
    yourTokens.forEach((token, i) => {
      const next = token + dice;
      if (next >= BOARD_SIZE * BOARD_SIZE) return;
      const isKill = oppTokens.includes(next);
      const isSafe = SAFE_ZONES.includes(next);
      if (isKill && pri < 3) { best = i; pri = 3; }
      else if (isSafe && pri < 2) { best = i; pri = 2; }
      else if (pri < 1) { best = i; pri = 1; }
    });
    if (best === -1) {
      setSuggestion('No valid move');
    } else {
      const from = yourTokens[best];
      const to = from + dice;
      setSuggestion(`Move token from ${from} to ${to}`);
    }
  };

  return (
    <div className="app">
      <h2>🎯 Ludo Smart Helper (Full Visual)</h2>
      <div className="board">
        {board.map((cell, i) => (
          <div
            key={i}
            className={`cell ${SAFE_ZONES.includes(i) ? 'safe' : ''} ${cell === 'A' ? 'you' : ''} ${cell === 'O' ? 'opp' : ''}`}
            onClick={() => handleCellClick(i)}
          >
            {cell || i}
          </div>
        ))}
      </div>
      <div className="controls">
        <label>Dice (1–6): </label>
        <input
          type="number"
          min="1"
          max="6"
          value={dice}
          onChange={(e) => setDice(+e.target.value)}
        />
        <button onClick={suggestMove}>Suggest Best Move</button>
        <div className="suggestion">💡 {suggestion}</div>
      </div>
    </div>
  );
}

export default App;
