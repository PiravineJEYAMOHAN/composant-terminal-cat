# Utilisez une image Node officielle en tant qu'image parent
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le fichier package.json dans le répertoire de travail du conteneur
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers dans le répertoire de travail du conteneur
COPY . .

# Construisez l'application React
RUN npm run build

# Commande à exécuter à la mise en marche du conteneur
CMD ["npm", "start"]
