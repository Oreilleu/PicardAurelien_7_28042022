# Installation #
Here are the dependancies you need to install:

NodeJS 12.14 or 14.0.
React 18.1.0
On Windows, these installations require to use PowerShell in administrator mode.

# Database #

This project use prisma's ORM to interact with mysql

To start the database, launch your server's mysql 

Then in the folder back run "npm install" then "npx prisma migrate dev" and "npx prisma generate"

# Usage #

When your database is on, you can begin to run the backend by : 

Run "npm run start". This should both run the local server

Use Ctrl+C in the terminal to stop the local server.

To run the browser go in the front folder, then run the command "npm install"  and "npm run start"

------------------------------------------------------------------------------------------------------

# Projet 7 de la formation développeur web d'Openclassrooms : Créez un réseau social d’entreprise #

- Authentifier un utilisateur et maintenir sa session
- Gérer un stockage de données à l'aide de SQL
- Implémenter un stockage de données sécurisé en utilisant SQL
- Personnaliser le contenu envoyé à un client web

# Scénario : #

Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.

Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux ! 🥂

Le client en question est Groupomania, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.
