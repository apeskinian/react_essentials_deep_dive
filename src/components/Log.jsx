export default function Log({ turns }) {
    return <ol id="log">
        {/* map through the turns prop which is an array of turns to update the log */}
        {turns.map(turn => (
            <li key={`${turn.square.row}${turn.square.col}`}>
                {turn.player} selected {turn.square.row},{turn.square.col}
            </li>
        ))}
    </ol>
}