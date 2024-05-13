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
        <li>compile [nom_fichier] - Compile le code (crée l'executable en cas de réussite)</li>
        <li>run [nom_fichier] - Exécute l'executable</li>
        <li>? - Affiche cette liste</li>
      </ul>
    </div>
  );
};

export default CommandListPopup