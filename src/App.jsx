import { useState } from 'react'

import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx';

function deriveActivePlayer(gameTurns) {
  // deriving current player from the current gameTurns state:
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // getting the current player using the helper function above and sending the current gameTurns as an argument
  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    // updating the game turns array by adding the latest move to the array at
    // the front of an immutable copy of the current array
    setGameTurns(prevTurns => {
      // getting current player from the prevTurns using the helper function above and passing prevTurns instead of gameTurns
      const currentPlayer = deriveActivePlayer(prevTurns);
      // create new copy of array with latest move added to the beginning
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className='highlight-player'>
        <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'}/>
        <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'}/>
      </ol>
      <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
    </div>
    {/* Sending gameTurns as a prop to update log */}
    <Log turns={gameTurns}/>
  </main>
}

export default App
