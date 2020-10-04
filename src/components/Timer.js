import React, { useState, useEffect, memo } from "react";
import Button from "./Button";
import styles from "./timer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { gameOver } from "../app/store";
import useWindowSize from "../utilities/useWindowSize";

export default memo(function Timer({ turn }) {
  const [timerValue, setTimerValue] = useState(5);
  const [timer1Secs, setTimer1Secs] = useState(0);
  const [timer1Mins, setTimer1Mins] = useState(5);
  const [timer2Secs, setTimer2Secs] = useState(0);
  const [timer2Mins, setTimer2Mins] = useState(5);
  const [currentTurn, setCurrentTurn] = useState(turn);
  const [editTime, setEditTime] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  const isPlaying = useSelector((state) => state.status.isPlaying);
  const { width } = useWindowSize();

  useEffect(() => {
    if (isPlaying) {
      setTimer1Mins(timerValue);
      setTimer2Mins(timerValue);
      setTimer1Secs(0);
      setTimer2Secs(0);
    }
  }, [isPlaying]);

  useEffect(() => {
    setCurrentTurn(turn);
  }, [turn]);

  useEffect(() => {
    if (isPlaying) {
      let timer = setTimeout(() => {
        if (currentTurn === "w") {
          if (timer1Secs === 0) {
            if (timer1Mins === 0) {
              if (!status.gameOver) {
                console.log("gameOver dispatched");
                dispatch(gameOver("timeOut", "black"));
              }
            } else {
              setTimer1Secs(59);
              setTimer1Mins(timer1Mins - 1);
            }
          } else {
            setTimer1Secs(timer1Secs - 1);
          }
        } else {
          if (timer2Secs === 0) {
            if (timer2Mins === 0) {
              if (!status.gameOver) {
                console.log("gameOver dispatched");
                dispatch(gameOver("timeOut", "white"));
              }
            } else {
              setTimer2Secs(59);
              setTimer2Mins(timer2Mins - 1);
            }
          } else {
            setTimer2Secs(timer2Secs - 1);
          }
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  });

  return (
    <div className={styles.timer}>
      <div className={styles.slider} hidden={width < 770}>
        <Button
          disabled={status.isPlaying}
          onClick={() => setEditTime(!editTime)}
        >
          {editTime ? "Save" : "Set Timer"}
        </Button>
        <input
          hidden={!editTime}
          type="range"
          min="1"
          max="30"
          step="1"
          value={timer1Mins}
          id="timeSlider"
          onChange={(e) => {
            setTimerValue(e.target.value);
            setTimer1Mins(e.target.value);
            setTimer2Mins(e.target.value);
            setTimer1Secs(0);
            setTimer2Secs(0);
          }}
        />
      </div>
      <div className={styles.playersTimers}>
        <div className={styles.player1}>
          <span className={styles.timer1}>
            {timer1Mins >= 10 ? timer1Mins : `0${timer1Mins}`} :{" "}
            {timer1Secs >= 10 ? timer1Secs : `0${timer1Secs}`}
          </span>
          <span>White {status.whiteScore}</span>
          <span
            className={styles.active}
            style={{ transform: currentTurn === "b" ? "scale(0)" : "scale(1)" }}
          ></span>
        </div>
        <div className={styles.player2}>
          <span className={styles.timer2}>
            {timer2Mins >= 10 ? timer2Mins : `0${timer2Mins}`} :{" "}
            {timer2Secs >= 10 ? timer2Secs : `0${timer2Secs}`}
          </span>
          <span>Black {status.blackScore}</span>
          <span
            // hidden={currentTurn === "w"}
            className={styles.active}
            style={{ transform: currentTurn === "w" ? "scale(0)" : "scale(1)" }}
          ></span>
        </div>
      </div>
    </div>
  );
});
