import React from "react";
import styles from "./layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      {children}
    </div>
  );
}

export default Layout;
