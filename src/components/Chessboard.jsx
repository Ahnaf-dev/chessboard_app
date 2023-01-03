import React, { useState, useEffect } from "react";
import Box from "./Box";

const Chessboard = ({ settings, currentColorPair, setCurrentColorPair }) => {
  const { chessBoardSize, colorPairs, hoverColor, textColor, selectedColor } =
    settings;
  const [selectedBox, setSelectedBox] = useState(1);
  const [openPalette, setOpenPalette] = useState(false);

  let generateBoxes = Array.from(
    Array(Number(chessBoardSize * chessBoardSize))
  );

  const setColorPair = (num) => {
    setCurrentColorPair(num);
    localStorage.setItem("chessboard-app-pair", `${num}`);
  };

  useEffect(() => {
    function setRandomPair() {
      let storedColorPair = localStorage.getItem("chessboard-app-pair");

      if (storedColorPair) {
        let randNumber = Math.floor(Math.random() * colorPairs.length);

        do {
          randNumber = Math.floor(Math.random() * colorPairs.length);
        } while (
          randNumber === Number(storedColorPair) &&
          colorPairs.length > 1
        );

        setColorPair(randNumber);
      }
    }

    setRandomPair();
  }, []);

  return (
    <div className="chessboard">
      <div className="container">
        <button
          onClick={() => setOpenPalette(!openPalette)}
          className="btn btn-toggle_palette"
        >
          Select Color Pair
        </button>
        <div
          style={{ display: `${openPalette ? "block" : "none"}` }}
          className="chessboard__palette"
        >
          {colorPairs.map((pair, index) => (
            <div key={index} className="color-pair">
              <div style={{ backgroundColor: pair.firstPair }}></div>
              <div style={{ backgroundColor: pair.secondPair }}></div>
              <button
                onClick={() => setColorPair(index)}
                className={`${currentColorPair === index ? "active" : ""}`}
              >
                {currentColorPair === index ? "Selected" : "Select"}
              </button>
            </div>
          ))}
        </div>
        <div
          style={{
            gridTemplateColumns: `repeat(${
              chessBoardSize % 2 === 0 ? chessBoardSize - 1 : chessBoardSize
            }, 1fr)`,
          }}
          className="chessboard__grid"
        >
          {generateBoxes.map((box, i) => (
            <Box
              key={i}
              id={i}
              settings={settings}
              currentColorPair={currentColorPair}
              selectedBox={selectedBox}
              setSelectedBox={setSelectedBox}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chessboard;
