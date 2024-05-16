import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Chemin relatif correct

const Game: React.FC = () => {
  const [dice, setDice] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [pastryAward, setPastryAward] = useState<{ name: string; image: string }[]>([]);
  const [rolling, setRolling] = useState(false);

  const rollDice = async () => {
    try {
      setRolling(true); // Commencez l'animation
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
          setRolling(false); // Arrêtez l'animation après 1 seconde
          setDice(response.data.dice || []); // Ajout de || [] pour éviter les erreurs si dice est null
          setMessage(response.data.message || ''); // Ajout de || '' pour éviter les erreurs si message est null
          setAttemptsLeft(response.data.attemptsLeft ?? 0); // Ajout de ?? 0 pour éviter les erreurs si attemptsLeft est null
          setPastryAward(Array.isArray(response.data.pastryAward) ? response.data.pastryAward : []); // Assurez-vous que pastryAward est un tableau
        }, 1000); // Durée de l'animation en millisecondes
      }
    } catch (error) {
      console.error('Error rolling dice:', error);
      setMessage('Failed to roll dice. Please try again.');
      setRolling(false); // Arrêtez l'animation en cas d'erreur
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
