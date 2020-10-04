import React from "react";
import styles from "./button.module.css";

export default function Button({ children, onClick, disabled, style }) {
  return (
    <button
      style={style}
      disabled={disabled}
      onClick={onClick}
      className={styles.button}
    >
      {children}
    </button>
  );
}
