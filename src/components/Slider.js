import React from "react";
import styles from "./slider.module.css";

export function Slider() {
  return (
    <div>
      <input type="range" min="1" max="30" step="1" id="timeSlider" />
      {/* <div className={styles.customTrack}></div>
      <div className={styles.customFill}></div>
      <div className={styles.customThump}></div> */}
    </div>
  );
}
