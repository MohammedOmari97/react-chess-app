import React, { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./gameOver.module.css";
import { useSelector, useDispatch } from "react-redux";

export function GameOver() {
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameOverStatus, setGameOverStatus] = useState(undefined);
  const gameOver = useSelector((state) => state.status.gameOver);
  const status = useSelector((state) => state.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (gameOver) {
      setShowGameOver(true);
      if (status.checkmate) {
        setGameOverStatus("Checkmate");
      } else if (status.stalemate) {
        setGameOverStatus("Stalemate");
      } else if (status.insufficientMaterial) {
        setGameOverStatus("Draw due to insufficient material!");
      } else if (status.threeFoldRepetition) {
        setGameOverStatus("Draw due to three fold repetition!");
      } else if (status.timeOut) {
        setGameOverStatus("Time's up!");
      }
    } else {
      setShowGameOver(false);
    }
  }, [gameOver]);

  return (
    <div hidden={!showGameOver} className={styles.gameOver}>
      {(status.stalemate ||
        status.threeFoldRepetition ||
        status.insufficientMaterial) && <h4>1/2 - 1/2</h4>}
      {(status.checkmate || status.timeOut) && (
        <h4>
          {status.winner === "white" ? "1" : "0"} -{" "}
          {status.winner === "black" ? "1" : "0"}
        </h4>
      )}
      <h3>{gameOverStatus}</h3>
      {(status.checkmate || status.timeOut) && (
        <h2>{status.winner.toUpperCase()} is Victorious!</h2>
      )}
      <Button
        style={{ width: "140px", marginBottom: "15px", margin: "auto" }}
        onClick={() => setShowGameOver(false)}
      >
        Go Again!
      </Button>
    </div>
  );
}
