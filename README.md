<p align="center">
  <a href="https://www.cat.savoircoder.fr/accueil/" target="_blank" rel="noopener noreferrer">
    <img width="100" src="https://www.cat.savoircoder.fr/static/moulinette/img/logo/home_logo.png" alt="CAT logo">
  </a>
</p>

# Projet Stage L3 - Terminal pour CAT (FRONT END)

## Fonctionnalités

> La plupart des fonctionnalités sont encore en cours de développement 

- Ecriture de commande \[en cours]
- Envoie de commande à un serveur FLASK \[en cours]
- Fenetre pop up avec la liste des commandes


## Commandes utilisés 
npx create-react-app composant-terminal

cd composant-terminal

npm install @xterm/xterm axios



## Execution en local 
S'assurer qu'on envoie les commandes à l'URL : http://localhost:5000/command (ligne 76 du Terminal.JS)

Faire la commande npm start à la racine du projet après s'être assuré qu'à la ligne 76 du terminal JS, l'URL renseigné est le suivant : 

## Execution avec docker 
S'assurer qu'on envoie les commandes à l'URL : http://host.docker.internal:5000/command (ligne 76 du Terminal.JS)

Faire les commandes : 

docker build -t composant-terminal-cat .

docker run -p 3000:3000 composant-terminal-cat



## Bibliothèques / API / outils utilisées


[![JavaScript version](https://img.shields.io/badge/JavaScript-%23F7DF1E?style=for-the-badge&logo=javascript&labelColor=grey)](https://developer.mozilla.org/fr/docs/Web/JavaScript)

[![React version](https://img.shields.io/badge/React%20v18.3.1-%2361DAFB?style=for-the-badge&logo=react&labelColor=grey)](https://fr.legacy.reactjs.org/)

[![@xterm/xterm version](https://img.shields.io/badge/@xterm/xterm%20v5.5.0-%23449acc?style=for-the-badge&logo=expertsexchange&logoColor=%23449acc&labelColor=grey)](https://xtermjs.org/)

Axios 1.6.8