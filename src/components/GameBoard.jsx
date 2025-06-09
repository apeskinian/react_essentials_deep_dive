import { useState } from "react";

const InitialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(InitialGameBoard);

    function handleSelectSquare(rowIndex, colIndex){
        setGameBoard((prevGameBoard) => {
            // creates a copy of the prevGameBoard array and use .map to make copies of the inner arrays too.
            // This updates the array in an immutable way which is best practise.
            const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            // Replace selected square with symbol..
            updatedGameBoard[rowIndex][colIndex] = 'X';
            // Return new board
            return updatedGameBoard;
        });
    }

    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={{colIndex}}>
                    <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
}