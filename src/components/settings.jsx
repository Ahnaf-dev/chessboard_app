import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
const Settings = ({
  setSettings,
  setOpenSettingModal,
  setCurrentColorPair,
}) => {
  const storedSettings = JSON.parse(
    localStorage.getItem("chessboard_settings")
  );

  const [chessBoardSize, setChessBoardSize] = useState(10);
  const [colorPairs, setColorPairs] = useState(
    storedSettings?.colorPairs || []
  );
  const [colorPair, setColorPair] = useState({
    firstPair: null,
    secondPair: null,
  });
  const [hoverColor, setHoverColor] = useState(
    storedSettings?.hoverColor || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    storedSettings?.selectedColor || ""
  );
  const [textColor, setTextColor] = useState(storedSettings?.textColor || "");

  const addColorPair = () => {
    if (colorPair.firstPair && colorPair.secondPair) {
      setColorPairs((state) => [...state, colorPair]);
    } else {
      alert("Please fill both color pair values");
    }
  };

  function onSubmit(e) {
    e.preventDefault();

    if (
      colorPairs.length > 0 &&
      hoverColor &&
      textColor &&
      selectedColor &&
      chessBoardSize
    ) {
      let settings = {
        chessBoardSize,
        colorPairs,
        hoverColor,
        textColor,
        selectedColor,
      };

      localStorage.setItem("chessboard_settings", JSON.stringify(settings));
      setSettings(settings);
      setOpenSettingModal(false);
      setCurrentColorPair(0);
    } else {
      alert("Please fill all values");
    }
  }

  const deleteColorPair = (id) => {
    setColorPairs((colorPairs) => {
      return colorPairs.filter((pair, index) => index !== id);
    });
  };
  return (
    <form onSubmit={onSubmit} className="settings">
      <h3>Settings</h3>
      <div className="settings__group settings__group-size">
        <label htmlFor="size">Chess Board Size *</label>
        <input
          onChange={(e) => setChessBoardSize(e.target.value)}
          id="size"
          type="number"
          placeholder="1-10"
          min={1}
          max={10}
          value={chessBoardSize}
        />
      </div>
      <div className="settings__group settings__group-pair">
        <h4>Set Color Pair * (Click + To Add)</h4>
        <div className="color-pair-input">
          <input
            onChange={(e) =>
              setColorPair({ ...colorPair, firstPair: e.target.value })
            }
            type="color"
          />
          <input
            onChange={(e) =>
              setColorPair({ ...colorPair, secondPair: e.target.value })
            }
            type="color"
          />
          <FaPlus onClick={() => addColorPair()} />
        </div>
        <div className="color-pairs">
          <h4>Current Color Pairs</h4>
          {colorPairs.length ? (
            colorPairs.map((pair, index) => (
              <div key={index} className="color-pair">
                <div style={{ backgroundColor: pair.firstPair }}></div>
                <div style={{ backgroundColor: pair.secondPair }}></div>
                <FaTrash onClick={() => deleteColorPair(index)} />
              </div>
            ))
          ) : (
            <p style={{ opacity: 0.8 }}>No Color Pairs</p>
          )}
        </div>
      </div>
      <div className="settings__group settings__group-hover">
        <label htmlFor="hover">Set Hover Color *</label>
        <input
          onChange={(e) => setHoverColor(e.target.value)}
          type="color"
          id="hover"
          value={hoverColor}
        />
      </div>
      <div className="settings__group settings__group-selected">
        <label htmlFor="selected">Set Selected Color *</label>
        <input
          onChange={(e) => setSelectedColor(e.target.value)}
          type="color"
          id="selected"
          value={selectedColor}
        />
      </div>
      <div className="settings__group settings__group-text">
        <label htmlFor="text">Set Text Color *</label>
        <input
          onChange={(e) => setTextColor(e.target.value)}
          type="color"
          id="text"
          value={textColor}
        />
      </div>
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default Settings;
