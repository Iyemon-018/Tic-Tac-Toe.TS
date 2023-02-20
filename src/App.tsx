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
    if (squares[i] || calculateWinner(squares)) {
      // すでに当該マスにマークがあるので操作不可とする。
      // または勝利が確定している場合はそれ以上ゲーム終了とする。
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

  // 勝利 or ゲーム続行 で現在の状態を表現する。
  const winner = calculateWinner(squares);
  let status = winner ? 'Winner: ' + winner
    : 'Next player: ' + (xIsNext ? 'X' : '0');

  return (
    <>
      <div className="status">{status}</div>
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

/**
 * 指定した状態から勝者が確定しているかどうかを判断します。
 * @param squares 現在の正方形に設定されたマーク文字列の配列を指定してください。
 * @returns 勝者が確定している場合は、そのプレイヤーのマーク文字列を返します。
 *          確定していない場合は、null を返します。
 */
function calculateWinner(squares: Array<string>): string | null {
  // 勝利と判断される正方形マスのパターンを定義する。
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a]
      && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export { Board };