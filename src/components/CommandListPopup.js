import React from 'react';

const CommandListPopup = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '30px',
        right: '10px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        padding: '10px',
        borderRadius: '5px',
        zIndex: '9998'
      }}
    >
      <h4>Liste des commandes :</h4>
      <ul>
        <li><b>save</b> &lt;filename&gt; - Sauvegarder le contenu actuel dans un fichier</li>
        <li><b>run</b> - Exécuter le code</li>
        <li><b>?</b> - Afficher/masquer cette liste</li>
      </ul>
    </div>
  );
};

export default CommandListPopup;
