import { useState } from 'react'

import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './assets/winning-combinations.js';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

// setting an empty array for a beginning game board
const INITIAL_GAME_BOARD = [
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

function deriveGameBoard(gameTurns) {
  // setting up the board initially from a copy of the empty one
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  // deriving the state of the game board from the array of turns
  for (const turn of gameTurns) {
      // get the turn and player from destructuring the turn
      const { square, player } = turn;
      // get the row and col from destructuring the square
      const { row, col } = square;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
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
      // setting the winner by accessing the players state and using the firstsquaresymbol to fetch the winner
      winner = players[firstSquareSymbol];
    };
  }

  return winner;
}

function App() {
  // managing state
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);
  // getting the current player using the helper function above and sending the current gameTurns as an argument
  const activePlayer = deriveActivePlayer(gameTurns);
  // get the game board from helper function by passing the gameTurns state
  const gameBoard = deriveGameBoard(gameTurns);
  // derive winner from helper function by sending the current game board and players
  const winner = deriveWinner(gameBoard, players);
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

  function handleRestart() {
    setGameTurns([]);
  }

  // Updating the player names by getting the prevPlayers and returning a copy with only the updated name for the symbol changed
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className='highlight-player'>
        <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
        <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
      </ol>
      {/* Showing the GameOver component on a win */}
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    {/* Sending gameTurns as a prop to update log */}
    <Log turns={gameTurns}/>
  </main>
}

export default App
