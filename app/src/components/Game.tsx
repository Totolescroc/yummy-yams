import React, { useState } from 'react';
import api from '../axiosConfig';

const Game: React.FC = () => {
  const [dice, setDice] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);

  const rollDice = async () => {
    setLoading(true);
    try {
      const response = await api.post('/game/roll');
      setDice(response.data.dice);
      setMessage(response.data.message);
      setAttemptsLeft(response.data.attemptsLeft);
    } catch (error) {
      console.error('Error rolling dice:', error);
      setMessage('Failed to roll dice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Game</h2>
      <button onClick={rollDice} disabled={loading || attemptsLeft === 0}>
        Roll Dice
      </button>
      <p>Attempts left: {attemptsLeft}</p>
      {dice.length > 0 && (
        <div>
          <h3>Dice:</h3>
          <ul>
            {dice.map((die, index) => (
              <li key={index}>{die}</li>
            ))}
          </ul>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Game;
