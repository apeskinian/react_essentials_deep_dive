import { useState } from "react";

export default function Player({ initialName, symbol }) {
    // playerName takes the default value from the initialName prop
    const [ playerName, setPlayerName ] = useState(initialName);
    const [ isEditing, setIsEditing ] = useState(false);

    function handleEdit() {
        setIsEditing(editing => !editing)
    }

    // Takes a new name from the input field and sets the name with useState.
    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    // This sets to an input field and listens to changes which are sent to useState.
    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    }

    return (
    <li>
        <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
    );
}