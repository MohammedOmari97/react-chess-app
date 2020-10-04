import React, { useState } from "react";
import Button from "./Button";
import styles from "./loadPGN.module.css";

export default function LoadPGN() {
  const [FEN, setFEN] = useState("");

  return (
    <div className={styles.fenContainer}>
      <Button>Load FEN</Button>
      <textarea
        className={styles.input}
        type="text"
        placeholder="Enter your FEN to load..."
        onChange={(e) => setFEN(e.target.value)}
      />
    </div>
  );
}
