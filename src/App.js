import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Tools from "./components/Tools";
import styles from "./app.module.css";
import LoadPGN from "./components/LoadPGN";
import { game } from "./app/store";
import { useDispatch, useSelector } from "react-redux";
import { gameOver } from "./app/store";
import useWindowSize from "./utilities/useWindowSize";
import useDeviceDetect from "./utilities/useDeviceDetect";

function App() {
  const [rotation, setRotation] = useState(true);
  const [myGame, setMyGame] = useState(game);
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.positions.allPositions);
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    if (myGame.game_over()) {
      dispatch(gameOver());
    }
    setMyGame(game);
  });

  return (
    <>
      {!isMobile ? (
        <DndProvider backend={HTML5Backend}>
          <div className={styles.container}>
            <div className={styles.gameSection}>
              <Board rotation={rotation} />
              <Tools setRotation={setRotation} />
            </div>
            {/* <LoadPGN /> */}
          </div>
        </DndProvider>
      ) : (
        <div style={{ padding: "10px" }}>
          This app uses ReactDnD with the HTML5 Backend which doesn't support
          touch events. <br />
          Use this app on a desktop.
        </div>
      )}
    </>
  );
}

export default App;
