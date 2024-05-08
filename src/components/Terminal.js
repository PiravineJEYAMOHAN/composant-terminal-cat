import React, { useRef, useEffect, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import 'xterm/css/xterm.css';
import axios from 'axios';
import CommandListPopup from './CommandListPopup';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const [showHelp, setShowHelp] = useState(false);
  const terminalActive = useRef(true);
  const terminal = useRef(null);
  const commandBuffer = useRef('');
  const commandHistory = useRef([]);
  const historyIndex = useRef(-1);

  useEffect(() => {
    terminal.current = new Terminal();
    terminal.current.open(terminalRef.current);
    updatePrompt();

    terminal.current.onKey(e => {
      const printable = !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;

      if (terminalActive.current) {
        if (e.domEvent.keyCode === 13) {
          terminal.current.write('\r\n');
          handleCommand(commandBuffer.current.trim());
          terminalActive.current = false;
          updatePrompt();
          if (commandBuffer.current.trim() !== '') {
            commandHistory.current.push(commandBuffer.current);
            historyIndex.current = commandHistory.current.length;
          }
          commandBuffer.current = '';
        } else if (e.domEvent.keyCode === 127 || e.domEvent.keyCode === 8) {
          if (commandBuffer.current.length > 0) {
            commandBuffer.current = commandBuffer.current.slice(0, -1);
            terminal.current.write('\b \b');
          }
        } else if (e.domEvent.keyCode === 38) {
          if (historyIndex.current > 0) {
            historyIndex.current--;
            clearLine();
            commandBuffer.current = commandHistory.current[historyIndex.current];
            terminal.current.write(commandBuffer.current);
          }
        } else if (e.domEvent.keyCode === 40) {
          if (historyIndex.current < commandHistory.current.length - 1) {
            historyIndex.current++;
            clearLine();
            commandBuffer.current = commandHistory.current[historyIndex.current];
            terminal.current.write(commandBuffer.current);
          } else if (historyIndex.current === commandHistory.current.length - 1) {
            historyIndex.current++;
            clearLine();
            commandBuffer.current = '';
          }
        } else if (printable) {
          commandBuffer.current += e.key;
          terminal.current.write(e.key);
        }
      }
    });

    return () => {
      terminal.current.dispose();
    };
  }, []);

  const handleCommand = async (input) => {
    const [command, ...args] = input.split(' ');
    try {
      const response = await axios.post('http://localhost:5000/command', { command, args });
      terminal.current.write(response.data);
    } catch (error) {
      terminal.current.write(`\r Error: ${error.message}`);
      updatePrompt();
    } finally {
      terminalActive.current = true;
      updatePrompt();
    }
  };

  const updatePrompt = () => {
    if (terminalActive.current) {
      terminal.current.write('\r\n$ ');
    } else {
      terminal.current.write('\r\n');
    }
  };

  const handleKeyPress = (e) => {
    if (!terminalActive.current) {
      e.preventDefault();
    }
  };

  const clearLine = () => {
    terminal.current.write('\x1b[2K\r$ ');
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
        ?
      </button>
      {showHelp && <CommandListPopup />}
      <div
        ref={terminalRef}
        onKeyDown={handleKeyPress}
        tabIndex={terminalActive.current ? 0 : -1}
        style={{ outline: 'none' }}
      />
    </div>
  );
};

export default TerminalComponent;
