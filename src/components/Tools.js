import React, { useEffect, useState } from "react";
import styles from "./tools.module.css";
import Dropdown from "./Dropdown";
import {
  changeBoardTheme,
  changePieceSet,
  resetBoard,
  reset,
  startPlaying,
  resetScores,
} from "../app/store";
import { game } from "../app/store";
import Timer from "./Timer";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import useWindowSize from "../utilities/useWindowSize";

export default function Tools({ setRotation }) {
  const positions = useSelector((state) => state.positions.allPositions);
  const status = useSelector((state) => state.status);
  const [myGame, setMyGame] = useState(game);
  const turn = myGame.turn();
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  useEffect(() => {
    setMyGame(game);
  });

  return (
    <div className={styles.tools}>
      <Dropdown
        label="Piece set"
        list={["bases", "cases", "neo", "neo-wood"]}
        liHandler={changePieceSet}
        hidden={width < 770}
      />
      <Dropdown
        label="Board themes"
        list={["bg1", "bg2", "bg3", "bg4", "bg5", "bg6"]}
        liHandler={changeBoardTheme}
        hidden={width < 770}
      />
      <div>
        <input
          className={styles.input}
          type="checkbox"
          id="rotation"
          name="disable rotation"
          onChange={() => setRotation((rotation) => !rotation)}
          hidden={width < 770}
        />
        <label hidden={width < 770} htmlFor="rotation">
          Disable rotation
        </label>
      </div>
      <Timer hidden={width < 770} turn={turn} />
      <div className={styles.playReset}>
        <Button
          // disabled={status.isPlaying}
          onClick={() => {
            if (status.isPlaying) {
              dispatch(reset());
              dispatch(resetBoard());
            } else {
              dispatch(reset());
              dispatch(resetBoard());
              dispatch(startPlaying());
            }
          }}
        >
          {status.isPlaying ? "New Game" : "Play"}
        </Button>
        <Button
          disabled={status.isPlaying}
          onClick={() => dispatch(resetScores())}
        >
          Reset Scores
        </Button>
      </div>
    </div>
  );
}
