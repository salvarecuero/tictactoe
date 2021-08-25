import React, { useEffect, useState } from "react";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [gameStatus, setGameStatus] = useState({
    finished: false,
    winner: null,
  });

  const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    if (gameStatus.winner) return;
    else if (
      squares.filter(Boolean).length === 9 &&
      !gameStatus.winner &&
      !gameStatus.finished
    ) {
      setGameStatus({
        finished: true,
        winner: null,
      });
    }
  }, [squares, gameStatus]);

  const Square = ({ index }) => {
    return (
      <div className="square" onClick={() => selectSquare(index)}>
        {squares[index]}
      </div>
    );
  };

  const whoGoesNext = () => {
    return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
  };

  const selectSquare = (index) => {
    if (gameStatus.finished || squares[index]) return;
    const newSquares = [...squares];
    newSquares[index] = whoGoesNext(newSquares);

    if (doWeHaveAWinner(newSquares)) {
      setSquares(newSquares);
      setGameStatus({
        finished: true,
        winner: whoGoesNext(),
      });
    } else setSquares(newSquares);
  };

  const doWeHaveAWinner = (newSquares = squares) => {
    return winnerCombinations.find((comb) => {
      const [a, b, c] = comb;
      const referenceValue = newSquares[a];
      return (
        referenceValue &&
        newSquares[b] === referenceValue &&
        newSquares[c] === referenceValue
      );
    });
  };

  const restartGame = () => {
    setGameStatus({
      finished: false,
      winner: null,
    });

    setSquares(Array(9).fill(null));
  };

  function Result() {
    const [buttonHovered, setButtonHovered] = useState(false);
    return (
      <>
        <span id="result">
          {gameStatus.winner
            ? `${gameStatus.winner} has won! 🎉`
            : `It's a draw 🥴`}{" "}
        </span>

        <button
          id="restart-button"
          onClick={restartGame}
          onMouseOver={() => setButtonHovered(true)}
          onMouseOut={() => setButtonHovered(false)}
          title="You know, open it"
        >
          Restart {!buttonHovered ? "🔒" : "🔓"}
        </button>
      </>
    );
  }

  return (
    <>
      {gameStatus.finished ? <Result winner={gameStatus.winner} /> : ""}
      <div className="board-row">
        <Square index={0} />
        <Square index={1} />
        <Square index={2} />
      </div>
      <div className="board-row">
        <Square index={3} />
        <Square index={4} />
        <Square index={5} />
      </div>
      <div className="board-row">
        <Square index={6} />
        <Square index={7} />
        <Square index={8} />
      </div>
    </>
  );
}

export default Game;
