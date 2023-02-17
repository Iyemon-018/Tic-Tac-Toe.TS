import React, { useState } from "react";
import "./styles.css";

const Square: React.FunctionComponent<{ value: string, onSquareClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ value, onSquareClick }) => {
  return (<button className="square" onClick={onSquareClick}>{value}</button>);
}

const Board: React.FunctionComponent<{}> = () => {
  const [squares, setSquares] = useState<Array<string>>(Array(9).fill(null));

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
}

export { Board };