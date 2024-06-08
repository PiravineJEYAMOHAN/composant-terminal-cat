import React, { useState } from 'react';
import './App.css';
import Terminal from './components/Terminal';
import CommandListPopup from './components/CommandListPopup';
import SendToGiteaButton from './components/SendToGiteaButton'; // Import the new component
import { ChakraProvider, Text, Input, Button } from '@chakra-ui/react';
import settings from './config/settings';

function App() {
  const [studentId, setStudentId] = useState('');
  const [showTerminal, setShowTerminal] = useState(false);

  const handleStudentIdSubmit = (event) => {
    event.preventDefault();
    setShowTerminal(true);
  };

  return (
    <ChakraProvider>
      <div className="App">
        {!showTerminal ? (
          <form onSubmit={handleStudentIdSubmit}>
            <h1>Entrez votre numéro étudiant</h1>
            <Input 
              type="text"
              width="10%"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
            <br/>
            <Button type="submit">Commencer</Button>
          </form>
        ) : (
          <>
            <Text fontSize="5xl">Terminal</Text>
            <div className="TerminalContainer">
              <SendToGiteaButton studentId={studentId} />
              {settings.showHelpButton && <CommandListPopup />}
              <Terminal studentId={studentId} />
            </div>
          </>
        )}
      </div>
    </ChakraProvider>
  );
}

export default App;
