import React, { useState } from "react";
import "./styles.css";

const Square: React.FunctionComponent<{ value: string, onSquareClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ value, onSquareClick }) => {
  return (<button className="square" onClick={onSquareClick}>{value}</button>);
}

const Board: React.FunctionComponent<{xIsNext: boolean, squares: string[], onPlay: (nextSquares: string[]) => void}> = (props) =>{
  /**
   * 正方形をクリックしたときのクリックイベントです。
   * クリックした正方形のマスにマークを描き、プレイヤーの攻撃順序を進めます。
   * @param i クリックした正方形の位置インデックスを指定してください。
   */
  function handleSquareClick(i: number): void {
    if (props.squares[i] || calculateWinner(props.squares)) {
      // すでに当該マスにマークがあるので操作不可とする。
      // または勝利が確定している場合はそれ以上ゲーム終了とする。
      return;
    }

    const nextSquares: string[] = props.squares.slice();

    if (props.xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    props.onPlay(nextSquares);
  }

  // 勝利 or ゲーム続行 で現在の状態を表現する。
  const winner = calculateWinner(props.squares);
  let status = winner ? 'Winner: ' + winner
    : 'Next player: ' + (props.xIsNext ? 'X' : '0');

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={props.squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={props.squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={props.squares[2]} onSquareClick={() => handleSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={props.squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={props.squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={props.squares[5]} onSquareClick={() => handleSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={props.squares[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={props.squares[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={props.squares[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  // プレイヤー順序を識別するための値です。
  // true: 先攻, false: 後攻
  const [xIsNext, setXIsNext] = useState(true);

  // 各正方形マスの状態を保持する。
  // 9=取りうる最大の手数 となる。
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquare: string[]){
    setHistory([...history, nextSquare]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

/**
 * 指定した状態から勝者が確定しているかどうかを判断します。
 * @param squares 現在の正方形に設定されたマーク文字列の配列を指定してください。
 * @returns 勝者が確定している場合は、そのプレイヤーのマーク文字列を返します。
 *          確定していない場合は、null を返します。
 */
function calculateWinner(squares: string[]): string | null {
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
