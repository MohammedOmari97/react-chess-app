import React, { useState, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { game } from "../app/store.js";
import styles from "./cell.module.css";
import { useSelector } from "react-redux";
import useSound from "use-sound";

function Cell({ row, column, squareName, rotation, children }) {
  const positions = useSelector((state) => state.positions.allPositions);
  const [myGame, setMyGame] = useState(game);
  // const [toRotate, setToRotate] = useState("180deg");
  const [toRotate, setToRotate] = useState("0deg");
  const [enableRotation, setEnableRotation] = useState(rotation);
  const status = useSelector((state) => state.status);
  const [playMoveSound] = useSound("./sounds/move.mp3");
  const [playTakeSound] = useSound("./sounds/take.mp3");
  const [playCastleSound] = useSound("./sounds/castle.mp3");
  const [playPromotionSound] = useSound("./sounds/promotion.mp3");
  const [playCheckSound] = useSound("./sounds/check.mp3");

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

  useEffect(() => {
    setMyGame(game);
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "piece",
    drop: (item, monitor) => {
      if (
        item.pieceType === "king" &&
        item.square === "e1" &&
        squareName === "g1"
      ) {
        // white king side castiling
        playCastleSound();
        return { squareName, move: "O-O", castle: "WKS" };
      } else if (
        item.pieceType === "king" &&
        item.square === "e1" &&
        squareName === "c1"
      ) {
        // white queen side castiling
        playCastleSound();
        return { squareName, move: "O-O-O", castle: "WQS" };
      } else if (
        item.pieceType === "king" &&
        item.square === "e8" &&
        squareName === "g8"
      ) {
        // black king side castiling
        playCastleSound();
        return { squareName, move: "O-O", castle: "BKS" };
      } else if (
        item.pieceType === "king" &&
        item.square === "e8" &&
        squareName === "c8"
      ) {
        // black queen side castiling
        playCastleSound();
        return { squareName, move: "O-O-O", castle: "BQS" };
      }

      // we are going through here just to grab the move code
      let move = myGame.moves({ square: item.square }).find((move) => {
        if (
          (move[move.length - 1] === "+" && !move.includes("=")) ||
          (move[move.length - 1] === "#" && !move.includes("="))
        ) {
          if (move.slice(move.length - 3, move.length - 1) === squareName) {
            playCheckSound();
            return move;
          } else {
            return undefined;
          }
        } else if (move.includes("=")) {
          if (
            move.slice(move.indexOf("=") - 2, move.indexOf("=")) ===
              squareName &&
            (move[move.length - 1] === "Q" || move[move.length - 1] === "q")
          ) {
            playPromotionSound();
            return move;
          } else if (move.includes("+") || move.includes("#")) {
            playCheckSound();
            if (
              move.slice(move.indexOf("=") - 2, move.indexOf("=")) ===
                squareName &&
              (move[move.length - 2] === "Q" || move[move.length - 2] === "q")
            ) {
              return move;
            }
          }
        } else if (move.slice(move.length - 2) === squareName) {
          if (move.includes("x")) {
            playTakeSound();
          } else {
            playMoveSound();
          }
          return move;
        } else return undefined;
      });
      return { squareName, move, castle: undefined };
    },
    canDrop: (item, monitor) => {
      if (!status.gameOver && status.isPlaying) {
        let allMoves = myGame.moves({ square: item.square });
        let legalMoves = allMoves.map((move) => {
          if (
            (move[move.length - 1] === "+" && !move.includes("=")) ||
            (move[move.length - 1] === "#" && !move.includes("="))
          ) {
            return move.slice(move.length - 3, move.length - 1);
          } else if (move.includes("=")) {
            return move.slice(move.indexOf("=") - 2, move.indexOf("="));
          } else {
            return move.slice(move.length - 2);
          }
        });

        if (allMoves.includes("O-O")) {
          if (game.turn() === "w") {
            legalMoves.push("g1");
          } else {
            legalMoves.push("g8");
          }
        }
        if (allMoves.includes("O-O-O")) {
          if (game.turn() === "w") {
            legalMoves.push("c1");
          } else {
            legalMoves.push("c8");
          }
        }

        return legalMoves.includes(squareName);
      }
    },
    collect: (monitor) => {
      return { isOver: monitor.isOver(), canDrop: monitor.canDrop() };
    },
  });

  const bgColor = (row + column) % 2 === 0 ? "#c2d7e2" : "#efefef";

  return (
    <div
      className={styles.square}
      ref={drop}
      style={{
        // backgroundColor: bgColor,
        // transform: blackToPlay && rotation ? "rotate(180deg)" : undefined,
        transform: enableRotation
          ? `rotate(${toRotate})`
          : toRotate === "180deg"
          ? "0deg"
          : "180deg",
        transition: "all .3s .3s",
      }}
    >
      <div className={styles.mark} hidden={canDrop ? false : true}></div>
      {children}
    </div>
  );
}

export default Cell;
