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
      <h3>Liste de commandes :</h3>
      
      <h4>Compilation et exécution :</h4>
      <ul style={{ padding: 0, margin: 0, listStyle: 'none', textAlign: 'left' }}>
        <li>Compile un fichier C - <code>gcc nom_fichier.c -o nom_executable</code></li>
        <li>Exécuter un fichier C - <code>./nom_executable</code></li>
        <li>Exécuter un script Python - <code>python nom_fichier.py</code></li>
        <li>Exécuter un script Python 3 - <code>python3 nom_fichier.py</code></li>
        <li>Compiler un fichier Java - <code>javac NomFichier.java</code></li>
        <li>Exécuter un fichier Java - <code>java NomFichier</code></li>
      </ul>

      <h4>Navigation et gestion des fichiers :</h4>
      <ul style={{ padding: 0, margin: 0, listStyle: 'none', textAlign: 'left' }}>
        <li>Lister les fichiers et répertoires - <code>ls</code></li>
        <li>Changer de répertoire - <code>cd nom_du_repertoire / cd ..</code></li>
        <li>Créer un répertoire - <code>mkdir nom_du_repertoire</code></li>
      </ul>
    </div>
  );
};

export default CommandListPopup;
