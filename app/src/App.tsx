import React from 'react';
import { useSelector } from 'react-redux';
import Register from './components/Register';
import Login from './components/Login';
import Game from './components/Game';
import { RootState } from './redux/store';

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);

  return (
    <div className="App">
      <h1>Yummy Yams</h1>
      {!token ? (
        <>
          <Register />
          <Login />
        </>
      ) : (
        <Game />
      )}
    </div>
  );
};

export default App;
