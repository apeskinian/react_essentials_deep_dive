import { useState } from 'react'

import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './assets/winning-combinations.js';

// setting an empty array for a beginning game board
const InitialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  // deriving current player from the current gameTurns state:
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  // managing state
  const [gameTurns, setGameTurns] = useState([]);

  // getting the current player using the helper function above and sending the current gameTurns as an argument
  const activePlayer = deriveActivePlayer(gameTurns);

  // setting up the board initially from the empty one
  let gameBoard = InitialGameBoard

  // deriving the state of the game board from the array of turns
  for (const turn of gameTurns) {
      // get the turn and player from destructuring the turn
      const { square, player } = turn;
      // get the row and col from destructuring the square
      const { row, col } = square;

      gameBoard[row][col] = player;
  }

  // defining the winner variable to start as null
  let winner = null;
  // checking for a winning combination by comparing the current game board to known winning combinations
  for (const combination of WINNING_COMBINATIONS) {
    // getting the symbols currently in the game board
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    // check for the win
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      // setting the winner
      winner = firstSquareSymbol;
    };
  }
  // checking for a draw if there is no winner after 9 turns as there are only 9 squares
  const hasDraw = gameTurns.length === 9 && !winner;

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
      {/* Showing the GameOver component on a win */}
      {(winner || hasDraw) && <GameOver winner={winner}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    {/* Sending gameTurns as a prop to update log */}
    <Log turns={gameTurns}/>
  </main>
}

export default App
