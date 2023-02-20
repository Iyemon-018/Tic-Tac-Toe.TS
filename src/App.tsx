import React, { useState } from "react";
import "./styles.css";

const Square: React.FunctionComponent<{ value: string, onSquareClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ value, onSquareClick }) => {
  return (<button className="square" onClick={onSquareClick}>{value}</button>);
}

const Board: React.FunctionComponent<{}> = () => {
  // プレイヤー順序を識別するための値です。
  // true: 先攻, false: 後攻
  const [xIsNext, setXIsNext] = useState(true);

  // それぞれの正方形に表示されるマーク配列です。
  // 左上を0とし、右下に向かって最大8まで存在します。
  const [squares, setSquares] = useState<Array<string>>(Array(9).fill(null));

  /**
   * 正方形をクリックしたときのクリックイベントです。
   * クリックした正方形のマスにマークを描き、プレイヤーの攻撃順序を進めます。
   * @param i クリックした正方形の位置インデックスを指定してください。
   */
  function handleSquareClick(i: number): void {
    if (squares[i]) {
      // すでに当該マスにマークがあるので操作不可とする。
      return;
    }

    const nextSquares: Array<string> = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>
    </>
  );
}

export { Board };