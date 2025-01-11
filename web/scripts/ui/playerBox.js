export default function PlayerBox({player, inGame, formatState, handleClickLeft, handleClickRight}) {
    /*
    formatState
    0: regular
    1: name in <b></b> (corresponds to current player)
    2: name green (corresponds to current winner)
    */

    let nameDisplay, otherDisplay;

    if (formatState === 0) nameDisplay = <span style={{display:"block"}}>{player.name}</span>;
    else if (formatState === 1) nameDisplay = <span style={{display:"block"}}><b>{player.name}</b></span>;
    else if (formatState === 2) nameDisplay = <span style={{display:"block", color:"green"}}>{player.name}</span>;

    if (inGame) {
        otherDisplay = <>
            <span style={{fontSize:"24px"}}>🂠</span>
            <span style={{fontSize:"12px"}}>×{player.cards.length}</span>
        </>;
    } else {
        otherDisplay = <>
            <button onClick={handleClickLeft}>&lt;</button>
            <button onClick={handleClickRight}>&gt;</button>
        </>;
    }

    return <td className="player-box">
        {nameDisplay}
        {otherDisplay}
    </td>;
}