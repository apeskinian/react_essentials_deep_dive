import { useState } from 'react'

import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx';

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex) {
    // setting the active player to X or O depending on current set player
    setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X')
    // updating the game turns array by adding the latest move to the array at
    // the front of an immutable copy of the current array
    setGameTurns(prevTurns => {
      let currentPlayer = 'X'
      // checking for first move and changing player accordingly
      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O'
      }
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
