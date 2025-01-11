import PlayerBox from "./playerBox.js";
import {useState, useEffect} from 'react';

const socket = io();

export default function PlayerList({state}) {
    const [gameState, setGameState] = useState(state);

    let playerList = gameState.playerOrder.map((p) => gameState.players[p]); //player objects in order
    let playerBoxes = [];

    function handleReordering(index, isLeft) {
        if (index === 0 && isLeft || index === playerList.length-1 && !isLeft) return;
        if (isLeft) socket.emit("swapPlayerOrder", index, index-1);
        else socket.emit("swapPlayerOrder", index, index+1);
    }

    useEffect(() => {
        const handleEvent = e => setGameState(e.detail);

        document.addEventListener("socketUpdateGameState", handleEvent);
        return () => {
            document.removeEventListener("socketUpdateGameState", handleEvent);
        }
    }, []);
    
    for (let i = 0; i < playerList.length; i++) {
        let format = 0;
        if (gameState.curPlayer == i) format = 1;
        else if (gameState.winningPlayer == i) format = 2;
        playerBoxes[i] = <PlayerBox
            key={i}
            player={playerList[i]}
            inGame={gameState.gameStage != 0}
            formatState={format}
            handleClickLeft={() => handleReordering(i, true)}
            handleClickRight={() => handleReordering(i, false)}
            />;
    }

    return <table className="player-list">
        <tbody>
            <tr>
                {playerBoxes}
            </tr>
        </tbody>
    </table>;
}