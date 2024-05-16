import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 

const Game: React.FC = () => {
  const [dice, setDice] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [pastryAward, setPastryAward] = useState<{ name: string; image: string }[]>([]);
  const [rolling, setRolling] = useState(false);

  const rollDice = async () => {
    try {
      setRolling(true); // Commence l'animation
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
        setTimeout(() => {
          setRolling(false); // Arrêt l'animation après 1 seconde
          setDice(response.data.dice);
          setMessage(response.data.message);
          setAttemptsLeft(response.data.attemptsLeft);
          setPastryAward(response.data.pastryAward);
        }, 1000); // Durée de l'animation en millisecondes
      }
    } catch (error) {
      console.error('Error rolling dice:', error);
      setMessage('Failed to roll dice. Please try again.');
      setRolling(false); // Arrêt l'animation en cas d'erreur
    }
  };

  return (
    <div>
      <h2>Game</h2>
      <p>{message}</p>
      <div>
        {dice.map((die, index) => (
          <span key={index} className={`dice ${rolling ? 'roll' : ''}`}>{die}</span>
        ))}
      </div>
      <button onClick={rollDice} disabled={attemptsLeft === 0 || rolling}>
        Roll Dice
      </button>
      <p>Essais restants: {attemptsLeft}</p>
      {pastryAward.length > 0 && (
        <div>
          <h3>Félcitation !! Vous avez gagné ces patisseries:</h3>
          <ul>
            {pastryAward.map((pastry, index) => (
              <li key={index}>
                <img src={`http://localhost:3001/pastries/images/${pastry.image}`} alt={pastry.name} style={{ width: '200px', height: '200px' }} />
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
