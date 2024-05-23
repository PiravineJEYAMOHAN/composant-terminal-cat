import React, { useState } from 'react';
import './App.css';
import Terminal from './components/Terminal';

function App() {
  const [studentId, setStudentId] = useState('');
  const [showTerminal, setShowTerminal] = useState(false);

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
            <Terminal studentId={studentId} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
