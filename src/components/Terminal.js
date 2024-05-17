import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { io } from 'socket.io-client';
import CommandListPopup from './CommandListPopup';

const TerminalComponent = ({ studentId }) => {
  const terminalRef = useRef(null);
  const [showHelp, setShowHelp] = useState(false);
  const terminalActive = useRef(true);
  const terminal = useRef(null);
  const commandBuffer = useRef('');
  const cursorPosition = useRef(0);
  const commandHistory = useRef([]);
  const historyIndex = useRef(-1);
  const [currentDirectory, setCurrentDirectory] = useState(''); // Start with an empty directory
  const initialized = useRef(false);
  const socket = useRef(null);

  const updatePrompt = useCallback((directory) => {
    const promptDirectory = directory || currentDirectory;
    terminal.current.write(`\r\n\x1b[92m${promptDirectory} $ \x1b[0m`);
  }, [currentDirectory]);

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    socket.current.on('connect', () => {
      console.log('Connected to server');
    });

    socket.current.on('command_output', (data) => {
      terminal.current.write(data.output.replace(/\r?\n/g, '\r\n') + '\r\n');
      if (data.error) {
        terminal.current.write(data.error.replace(/\r?\n/g, '\r\n') + '\r\n');
      }
      if (data.current_directory) {
        setCurrentDirectory(data.current_directory);
        updatePrompt(data.current_directory);
      } else {
        updatePrompt();
      }
      terminalActive.current = true;
    });

    const fetchCurrentDirectory = async () => {
      try {
        const response = await fetch('http://localhost:5000/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ studentId })
        });
        const data = await response.json();
        if (data.current_directory) {
          setCurrentDirectory(data.current_directory);
          updatePrompt(data.current_directory);
        }
      } catch (error) {
        console.error('Error fetching current directory:', error);
      }
    };

    terminal.current = new Terminal();
    terminal.current.open(terminalRef.current);
    if(!initialized.current) {
      fetchCurrentDirectory();
      initialized.current = true;
    }

    terminal.current.onKey(e => {
      const printable = !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;
      const keyCode = e.domEvent.keyCode;
      const key = e.domEvent.key;

      if (terminalActive.current) {
        if (keyCode === 13) { // Enter key
          terminal.current.write('\r\n\n');
          handleCommand(commandBuffer.current.trim());
          terminalActive.current = false;
          if (commandBuffer.current.trim() !== '') {
            commandHistory.current.push(commandBuffer.current);
            historyIndex.current = commandHistory.current.length;
          }
          commandBuffer.current = '';
          cursorPosition.current = 0;
        } else if (keyCode === 127 || keyCode === 8) { // Backspace or Delete
          if (cursorPosition.current > 0) {
            commandBuffer.current = commandBuffer.current.slice(0, cursorPosition.current - 1) + commandBuffer.current.slice(cursorPosition.current);
            cursorPosition.current -= 1;
            terminal.current.write('\b \b');
            redrawLine();
          }
        } else if (keyCode === 38) { // Arrow Up
          if (historyIndex.current > 0) {
            historyIndex.current--;
            clearLine();
            commandBuffer.current = commandHistory.current[historyIndex.current];
            cursorPosition.current = commandBuffer.current.length;
            terminal.current.write(commandBuffer.current);
          }
        } else if (keyCode === 40) { // Arrow Down
          if (historyIndex.current < commandHistory.current.length - 1) {
            historyIndex.current++;
            clearLine();
            commandBuffer.current = commandHistory.current[historyIndex.current];
            cursorPosition.current = commandBuffer.current.length;
            terminal.current.write(commandBuffer.current);
          } else if (historyIndex.current === commandHistory.current.length - 1) {
            historyIndex.current++;
            clearLine();
            commandBuffer.current = '';
            cursorPosition.current = 0;
          }
        } else if (keyCode === 37) { // Arrow Left
          if (cursorPosition.current > 0) {
            cursorPosition.current -= 1;
            terminal.current.write('\x1b[D');
          }
        } else if (keyCode === 39) { // Arrow Right
          if (cursorPosition.current < commandBuffer.current.length) {
            cursorPosition.current += 1;
            terminal.current.write('\x1b[C');
          }
        } else if (printable) {
          commandBuffer.current = commandBuffer.current.slice(0, cursorPosition.current) + key + commandBuffer.current.slice(cursorPosition.current);
          cursorPosition.current += 1;
          terminal.current.write('\x1b[s'); // Save cursor position
          terminal.current.write('\x1b[K'); // Clear line from cursor right
          terminal.current.write(commandBuffer.current.slice(cursorPosition.current - 1));
          terminal.current.write('\x1b[u'); // Restore cursor position
          terminal.current.write('\x1b[C'); // Move cursor right
        }
      }
    });

    return () => {
      terminal.current.dispose();
      socket.current.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [studentId]);

  const redrawLine = () => {
    terminal.current.write('\x1b[s'); // Save cursor position
    terminal.current.write('\x1b[K'); // Clear line from cursor right
    terminal.current.write(commandBuffer.current.slice(cursorPosition.current));
    terminal.current.write('\x1b[u'); // Restore cursor position
  };

  const handleCommand = (input) => {
    const [command, ...args] = input.split(' ');
    socket.current.emit('execute_command', { command, args, studentId });
  };

  const handleKeyPress = (e) => {
    if (!terminalActive.current) {
      e.preventDefault();
    }
  };

  const clearLine = () => {
    terminal.current.write('\x1b[2K\r \x1b[92m$ \x1b[0m');
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <button
        onClick={() => setShowHelp(!showHelp)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          zIndex: '9999'
        }}
      >
        Aide
      </button>
      {showHelp && <CommandListPopup />}
      <div
        ref={terminalRef}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        style={{ outline: 'none' }}
      />
    </div>
  );
};

export default TerminalComponent;
