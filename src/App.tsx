import React, { useState } from "react";
import "./styles.css";

const Square: React.FunctionComponent<{ value: string | null, onSquareClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ value, onSquareClick }) => {
  return (<button className="square" onClick={onSquareClick}>{value}</button>);
}

const Board: React.FunctionComponent<{ xIsNext: boolean, squares: string[], onPlay: (nextSquares: string[]) => void }>
  = ({ xIsNext, squares, onPlay }) => {
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

      const nextSquares: string[] = squares.slice();
      nextSquares[i] = xIsNext ? 'X' : '0';

      onPlay(nextSquares);
    }

    // 勝利 or ゲーム続行 で現在の状態を表現する。
    const winner = calculateWinner(squares);
    const status = winner
      ? 'Winner: ' + winner
      : 'Next player: ' + (xIsNext ? 'X' : '0');

    return (
      <>
        <div className="status">{status}</div>
        {
          // 9マスの正方形を描く。
          // 上から行0～2と定義する。ここでは行単位でレンダリングする。
          [...Array(3)].map((_, row) => {
            return (
              <div key={row} className="board-row">
                {
                  // 左から列0～2と定義する。
                  [...Array(3)].map((__, column) => {
                    // 行列のインデックスをマス目のインデックスへ変換し、正方形をレンダリングする。
                    const i = (row * 3) + column;
                    return <Square key={column} value={squares[i]} onSquareClick={() => handleSquareClick(i)} />;
                  })
                }
              </div>
            );
          })
        }
      </>
    );
  }

export default function Game() {
  // プレイヤー順序を識別するための値です。
  // true: 先攻, false: 後攻
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  // 各正方形マスの状態を保持する。
  // 9=取りうる最大の手数 となる。
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);

  // 初手を0としたプレイヤーの順番を示す値です。
  const [currentMove, setCurrentMove] = useState<number>(0);

  // 現在の履歴情報です。
  const currentSquares: string[] = history[currentMove];

  /**
   * ゲームの手順が実行された際に呼ばれるイベントハンドラです。
   * @param nextSquares プレイヤーが操作したあとの正方形マスの状態です。
   */
  function handlePlay(nextSquares: string[]): void {
    // 現時点までの履歴を保持する。
    // 履歴をこの値で更新することで、現在履歴以降の履歴情報はクリアされることになる。
    const currentHistory = history.slice(0, currentMove + 1);

    // 現在進めた手順を加えた新しい手順がこれ。
    const nextHistory = [...currentHistory, nextSquares];

    setHistory([...currentHistory, nextSquares]);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  /**
   * 当該履歴を表示します。
   * @param nextMove ジャンプ先の履歴インデックスを指定します。
   */
  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);

    // 表示した履歴から継続できるようにプレイヤーの順序も更新する。
    setXIsNext(nextMove % 2 === 0);
  }

  // 履歴の選択ボタンリストを表示する JSX オブジェクト
  // ゲームが進むごとに履歴を蓄積し、ボタンでどの履歴であるかを表現する。
  // ボタンをクリックすると当該履歴の状態に戻す。
  const moves = history.map((squares, move) => {
    let description;

    if (move === 0) {
      description = 'Go to game start';
    } else if (move === currentMove) {
      description = 'You are at move #' + move;
    } else {
      description = 'Go to move #' + move;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
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
  const lines: number[][] = [
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
