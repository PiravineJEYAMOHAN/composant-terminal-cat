import React, { useState } from 'react';
import './App.css';
import Terminal from './components/Terminal';
import CommandListPopup from './components/CommandListPopup';
import SendToGiteaButton from './components/SendToGiteaButton'; // Import the new component
import settings from './config/settings';

function App() {
  const [studentId, setStudentId] = useState('');
  const [showTerminal, setShowTerminal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleStudentIdSubmit = (event) => {
    event.preventDefault();
    setShowTerminal(true);
  };

  return (
    <div className="App">
      {!showTerminal ? (
        <form onSubmit={handleStudentIdSubmit}>
          <h1>Entrez votre numéro étudiant</h1>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
          <button type="submit">Commencer</button>
        </form>
      ) : (
        <>
          <h1>Terminal</h1>
          <div className="TerminalContainer">
            {settings.showHelpButton && (
              <button
                onClick={() => setShowHelp(!showHelp)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: '9999',
                }}
              >
                Aide
              </button>
            )}
            {showHelp && <CommandListPopup />}
            <Terminal studentId={studentId} />
            <SendToGiteaButton studentId={studentId} /> {/* Add the new button here */}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
