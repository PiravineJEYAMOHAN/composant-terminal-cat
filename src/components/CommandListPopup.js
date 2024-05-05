import React from 'react';

const CommandListPopup = () => {
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
        zIndex: '9998'
      }}
    >
      <h3>Liste des commandes :</h3>
      <ul style={{ padding: 0, margin: 0, listStyle: 'none', textAlign: 'left' }}>
        <li>save [nom_fichier] - Sauvegarde un fichier</li>
        <li>run - Exécute le code</li>
        <li>? - Affiche cette liste</li>
      </ul>
    </div>
  );
};

export default CommandListPopup