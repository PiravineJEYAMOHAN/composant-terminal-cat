const commands = {
    python: [
      { description: 'Exécuter un script Python', command: 'python nom_fichier.py' },
      { description: 'Exécuter un script Python 3', command: 'python3 nom_fichier.py' },
    ],
    c: [
      { description: 'Compiler un fichier C', command: 'gcc nom_fichier.c -o nom_executable' },
      { description: 'Exécuter un fichier C', command: './nom_executable' },
    ],
    java: [
      { description: 'Compiler un fichier Java', command: 'javac NomFichier.java' },
      { description: 'Exécuter un fichier Java', command: 'java NomFichier' },
    ],
    javascript: [
      { description: 'Exécuter un script JavaScript', command: 'node nom_fichier.js' },
    ],
    html: [
      { description: 'Ouvrir un fichier HTML', command: 'open nom_fichier.html' },
    ],
    php: [
      { description: 'Exécuter un script PHP', command: 'php nom_fichier.php' },
    ],
  };
  
  const commonCommands = [
    { description: 'Lister les fichiers et répertoires', command: 'ls' },
    { description: 'Changer de répertoire', command: 'cd nom_du_repertoire / cd ..' },
    { description: 'Créer un répertoire', command: 'mkdir nom_du_repertoire' },
    { description: 'Voir la liste des dernières versions disponible sur gitea', command: 'listgitea' },
    { description: 'Télécharger le dossier', command: 'download' },
    { description: 'Télécharger toutes les versions du dossier', command: 'downloadgitea' },
  ];
  
  export { commands, commonCommands };
  