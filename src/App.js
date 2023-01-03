import { useState } from "react";
import Settings from "./components/Settings";
import Chessboard from "./components/Chessboard";
import Modal from "./components/Modal";

function App() {
  const storedSettings = JSON.parse(
    localStorage.getItem("chessboard_settings")
  );
  const [settings, setSettings] = useState(storedSettings);
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const [currentColorPair, setCurrentColorPair] = useState(0);

  function renderUI() {
    if (settings) {
      return (
        <>
          <h1 style={{ textAlign: "center", margin: "3rem" }}>Chess Board</h1>
          <div className="btn-group container">
            <button
              onClick={() => setOpenSettingModal(true)}
              className="btn btn-ghost"
            >
              Change Settings
            </button>
          </div>
          {openSettingModal && (
            <Modal>
              <Settings
                setCurrentColorPair={setCurrentColorPair}
                setOpenSettingModal={setOpenSettingModal}
                setSettings={setSettings}
              />
            </Modal>
          )}
          <Chessboard
            currentColorPair={currentColorPair}
            setCurrentColorPair={setCurrentColorPair}
            settings={settings}
          />
        </>
      );
    } else {
      return (
        <>
          <h1 style={{ opacity: 0.9, textAlign: "center", marginTop: "2rem" }}>
            Welcome!
          </h1>
          <h2
            style={{ textAlign: "center", opacity: 0.7, marginBottom: "3rem" }}
          >
            Please Set Your Default Settings For Chess Board
          </h2>
          <Settings
            setCurrentColorPair={setCurrentColorPair}
            setOpenSettingModal={setOpenSettingModal}
            setSettings={setSettings}
          />
        </>
      );
    }
  }

  return <main>{renderUI()}</main>;
}

export default App;
