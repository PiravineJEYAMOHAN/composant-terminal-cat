<p align="center">
  <a href="https://www.cat.savoircoder.fr/accueil/" target="_blank" rel="noopener noreferrer">
    <img width="100" src="https://www.cat.savoircoder.fr/static/moulinette/img/logo/home_logo.png" alt="CAT logo">
  </a>
</p>

# Projet Stage L3 - Terminal pour CAT (FRONT END)

## Fonctionnalités

- Ecriture de commande 
- Envoie de commande à un serveur FLASK 
- Fenetre pop up avec la liste des commandes
- dossier et fichiers de configurations du terminal

## Dépot du serveur lié à ce terminal 

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=PiravineJEYAMOHAN&repo=serveur-flask-cat&border_color=7F3FBF&bg_color=0D1117&title_color=C9D1D9&text_color=8B949E&icon_color=7F3FBF)](https://github.com/PiravineJEYAMOHAN/serveur-flask-cat)


## Execution (du terminal et du serveur à la fois)
- Ouvrir Docker Desktop
- Cloner le projet composant-terminal-cat dans un dossier nommé CAT, cloner aussi le projet serveur-flask-cat dans ce dossier CAT
- Créer dans le dossier CAT un fichier nommé docker-compose.yml avec le contenu suivant : 

```yaml
version: '3'
services:
  server:
    build: ./serveur-flask-cat
    ports:
      - "5000:5000"
    volumes:
      - ./serveur-flask-cat/config:/app/config
      - ./dossier_etudiant:/app/dossier_etudiant
    networks:
      - default

  terminal:
    build: ./composant-terminal-cat
    ports:
      - "3000:3000"
    networks:
      - default

networks:
  default:
    driver: bridge

```


- faire les commandes (depuis le dossier CAT) : 
docker-compose build 
docker-compose up



## Commandes utilisés (non nécessaire avec docker)
npx create-react-app composant-terminal

cd composant-terminal

npm install @xterm/xterm axios

npm install socket.io-client

npm install @chakra-ui/react


## Bibliothèques / API / outils utilisées


[![JavaScript version](https://img.shields.io/badge/JavaScript-%23F7DF1E?style=for-the-badge&logo=javascript&labelColor=grey)](https://developer.mozilla.org/fr/docs/Web/JavaScript)

[![React version](https://img.shields.io/badge/React%20v18.3.1-%2361DAFB?style=for-the-badge&logo=react&labelColor=grey)](https://fr.legacy.reactjs.org/)

[![@xterm/xterm version](https://img.shields.io/badge/@xterm/xterm%20v5.5.0-%23449acc?style=for-the-badge&logo=expertsexchange&logoColor=%23449acc&labelColor=grey)](https://xtermjs.org/)

Axios 1.6.8