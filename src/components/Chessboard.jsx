import React, { useState } from "react";
import Box from "./Box";
const Chessboard = ({ settings }) => {
  const { chessBoardSize, colorPairs, hoverColor, textColor, selectedColor } =
    settings;
  const [currentColorPair, setCurrentColorPair] = useState(0);
  const [selectedBox, setSelectedBox] = useState(0);

  let generateBoxes = Array.from(
    Array(Number(chessBoardSize * chessBoardSize))
  );

  return (
    <div className="chessboard">
      <div className="container">
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
