import React from 'react';
import settings from '../config/settings';
import { commands, commonCommands } from '../config/helpCommands';

const CommandListPopup = () => {
  const languageCommands = commands[settings.language] || [];

  return (
    <div
      style={{
        position: 'absolute',
        top: '30px',
        right: '10px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        zIndex: '9998',
      }}
    >
      <h3>Liste de commandes :</h3>
      
      <h4>Compilation et exécution :</h4>
      <ul style={{ padding: 0, margin: 0, listStyle: 'none', textAlign: 'left' }}>
        {languageCommands.map((cmd, index) => (
          <li key={index}>
            {cmd.description} - <code>{cmd.command}</code>
          </li>
        ))}
      </ul>

      <h4>Navigation et gestion des fichiers :</h4>
      <ul style={{ padding: 0, margin: 0, listStyle: 'none', textAlign: 'left' }}>
        {commonCommands.map((cmd, index) => (
          <li key={index}>
            {cmd.description} - <code>{cmd.command}</code>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommandListPopup;
