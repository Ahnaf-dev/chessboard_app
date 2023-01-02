import React, { useRef, useState } from "react";

const Box = ({
  settings,
  currentColorPair,
  id,
  selectedBox,
  setSelectedBox,
}) => {
  const { chessBoardSize, colorPairs, hoverColor, textColor, selectedColor } =
    settings;
  const firstColor = colorPairs[currentColorPair].firstPair;
  const secondColor = colorPairs[currentColorPair].secondPair;
  const box = useRef(null);

  const [clickedNumber, setClickedNumber] = useState(0);

  function changeColors(option) {
    if (option === "enter" && id !== selectedBox) {
      box.current.style.backgroundColor = hoverColor;
    }

    if (option === "leave" && id !== selectedBox) {
      resetStyle();
    }

    if (option === "select") {
      setClickedNumber(clickedNumber + 1);
      let removeActiveStyles = document
        .querySelector(".selected")
        ?.classList.remove("selected");
      let setActiveStyle = box.current.classList.add("selected");

      setSelectedBox(id);
    }
  }

  function resetStyle() {
    box.current.style.backgroundColor = `${
      id % 2 === 0 ? firstColor : secondColor
    }`;
  }

  return (
    <div
      ref={box}
      style={{
        backgroundColor: `${
          selectedBox === id
            ? selectedColor
            : id % 2 === 0
            ? firstColor
            : secondColor
        }`,
        color: textColor,
      }}
      className="chessboard__box"
      onMouseEnter={() => changeColors("enter")}
      onMouseLeave={() => changeColors("leave")}
      onClick={() => changeColors("select")}
    >
      <span>{clickedNumber}</span>
    </div>
  );
};

export default Box;
