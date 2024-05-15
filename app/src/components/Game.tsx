import React, { useState } from 'react';
import axios from 'axios';

const Game: React.FC = () => {
  const [dice, setDice] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [pastryAward, setPastryAward] = useState<{ name: string; image: string }[]>([]);

  const rollDice = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3001/game/roll',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        setDice(response.data.dice);
        setMessage(response.data.message);
        setAttemptsLeft(response.data.attemptsLeft);
        setPastryAward(response.data.pastryAward);
      }
    } catch (error) {
      console.error('Error rolling dice:', error);
      setMessage('Failed to roll dice. Please try again.');
    }
  };

  return (
    <div>
      <h2>Game</h2>
      <p>{message}</p>
      <div>
        {dice.map((die, index) => (
          <span key={index}>{die} </span>
        ))}
      </div>
      <button onClick={rollDice} disabled={attemptsLeft === 0}>
        Roll Dice
      </button>
      <p>Attempts left: {attemptsLeft}</p>
      {pastryAward.length > 0 && (
        <div>
          <h3>Congratulations! You have won the following pastries:</h3>
          <ul>
            {pastryAward.map((pastry, index) => (
              <li key={index}>
                <img src={`http://localhost:3001/pastries/images/${pastry.image}`} alt={pastry.name} style={{ width: '100px', height: '100px' }} />
                {pastry.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Game;
