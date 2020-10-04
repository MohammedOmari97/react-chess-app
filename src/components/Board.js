import React, { useEffect, useState, useRef } from "react";
import Cell from "./Cell";
import Piece from "./Piece";
import { useSelector } from "react-redux";
import styles from "./board.module.css";
import { game } from "../app/store";
import { GameOver } from "./GameOver";

function Board({ rotation }) {
  const positions = useSelector((state) => state.positions.allPositions);
  const boardTheme = useSelector((state) => state.positions.boardTheme);

  const [myGame, setMyGame] = useState(game);
  // const [toRotate, setToRotate] = useState("180deg");
  const [toRotate, setToRotate] = useState("0deg");
  const [enableRotation, setEnableRotation] = useState(rotation);
  const status = useSelector((state) => state.status);
  // const blackToPlay = myGame.turn() === "b";
  // console.log(blackToPlay);

  useEffect(() => {
    setMyGame(game);
  });

  useEffect(() => {
    setEnableRotation(rotation);
  }, [rotation]);

  const isMounted = useRef(false);

  useEffect(() => {
    if (rotation) {
      if (isMounted.current) {
        setToRotate(toRotate === "180deg" ? "0deg" : "180deg");
        isMounted.current = true;
      } else {
        isMounted.current = true;
      }
    }
  }, [positions]);

  function renderPiece(piece, row, column) {
    if (piece === undefined) {
      return undefined;
    } else {
      return (
        <Piece
          piece={piece.piece}
          id={piece.id}
          square={piece.square}
          row={row}
          column={column}
          type={piece.type}
          color={piece.color}
          pieceId={piece.pieceId}
        />
      );
    }
  }

  return (
    <div className={styles.boardWrapper}>
      <div
        className={styles.board}
        style={{
          backgroundImage: `url(/images/chess-${boardTheme}.jpg)`,
          backgroundSize: "contain",
          // transform: blackToPlay && rotation ? "rotate(180deg)" : undefined,
          transform:
            enableRotation && !status.gameOver
              ? `rotate(${toRotate})`
              : toRotate === "180deg"
              ? "0deg"
              : "180deg",
          transition: "all .3s .3s",
        }}
      >
        {Array(8)
          .fill(null)
          .map((i, row) => {
            return Array(8)
              .fill(null)
              .map((j, column) => {
                let squareName = `${
                  column + 1 === 1
                    ? "a"
                    : column + 1 === 2
                    ? "b"
                    : column + 1 === 3
                    ? "c"
                    : column + 1 === 4
                    ? "d"
                    : column + 1 === 5
                    ? "e"
                    : column + 1 === 6
                    ? "f"
                    : column + 1 === 7
                    ? "g"
                    : column + 1 === 8
                    ? "h"
                    : undefined
                }${8 - row}`;
                return (
                  <Cell
                    key={squareName}
                    row={8 - row}
                    column={column + 1}
                    squareName={squareName}
                    rotation={rotation}
                  >
                    {renderPiece(
                      positions.find((piece) => piece.square === squareName),
                      row,
                      column
                    )}
                  </Cell>
                );
              });
          })}
      </div>
      <GameOver />
    </div>
  );
}

export default Board;
