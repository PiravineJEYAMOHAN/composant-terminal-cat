import React from 'react';
import './App.css';
import Terminal from './components/Terminal';

function App() {
  return (
    <div className="App">
      <h1>Composant Terminal</h1>
      <div className="TerminalContainer">
        <Terminal />
      </div>
    </div>
  );
}

export default App;