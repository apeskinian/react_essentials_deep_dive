const InitialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
    // setting up the board initially from the empty one
    let gameBoard = InitialGameBoard

    // deriving the state of the game board from the array of turns
    for (const turn of turns) {
        // get the turn and player from destructuring the turn
        const { square, player } = turn;
        // get the row and col from destructuring the square
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    // OLD CODE
    // const [gameBoard, setGameBoard] = useState(InitialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         // creates a copy of the prevGameBoard array and use .map to make copies of the inner arrays too.
    //         // This updates the array in an immutable way which is best practise.
    //         const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         // Replace selected square with symbol..
    //         updatedGameBoard[rowIndex][colIndex] = symbol;
    //         // Return new board
    //         return updatedGameBoard;
    //     });
    //     // Execute the handleSelectSquare function in the app component
    //     onSelectSquare();
    // }

    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={{colIndex}}>
                    <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
}