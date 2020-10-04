import React, { useState, useRef } from "react";
import styles from "./dropdown.module.css";
import { useDispatch } from "react-redux";

export default function Dropdown({ label, list, liHandler, ...props }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeListItem, setActiveListItem] = useState(list[0]);
  const dispatch = useDispatch();

  const dropdownListRef = useRef();

  return (
    <div className={styles.dropdown} {...props}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={styles.button}
      >
        {label}
        <span className={styles.dropdownCaret}></span>
      </button>
      <div
        onClick={(e) => {
          if (e.target === dropdownListRef.current) {
            setShowDropdown(false);
          }
        }}
        ref={dropdownListRef}
        hidden={!showDropdown}
        className={styles.dropdownList}
      >
        {list.map((listItem) => {
          return (
            <div
              onClick={() => {
                dispatch(liHandler(listItem));
                setActiveListItem(listItem);
              }}
              className={styles.listItem}
            >
              <svg
                // class="octicon octicon-check select-menu-item-icon"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                // aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "5px",
                  transform: "translate(0, -50%)",
                }}
                hidden={activeListItem !== listItem}
              >
                <path
                  // fill-rule="evenodd"
                  d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                ></path>
              </svg>
              {listItem}
            </div>
          );
        })}
      </div>
    </div>
  );
}
