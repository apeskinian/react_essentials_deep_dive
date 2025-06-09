export default function GameOver({ winner }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {/* Dynamically showing a winner or draw scenario based on the existence of the winner prop */}
            {winner && <p>{winner} won!</p>}
            {!winner && <p>It's a draw!</p>}
            <p>
                <button>Rematch!</button>
            </p>
        </div>
    );
}