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

Votre directrice, Stéphanie, vient de signer un nouveau contrat avec Groupomania, un groupe spécialisé dans la grande distribution, et l'un des plus fidèles clients de l'agence. Après en avoir discuté avec Caroline, votre manager, elle vous envoie un mail pour vous briefer sur votre mission :

Pour résumer ta mission : à partir du brief, tu vas devoir produire une toute première version du projet, que nous pourrons faire tester à quelques employés de Groupomania pour valider la partie fonctionnelle. 

En ce qui concerne l’aspect graphique, nous allons pour le moment limiter les choses au minimum, c’est-à-dire :
- respecter l’identité graphique fournie dans le brief ;
- produire quelque chose de responsive qui s'adapte aux desktop, tablette et mobile ;
- tout le reste est expliqué sur le brief. À part ça, tu as carte blanche, mais attention à ne pas te lancer dans quelque chose de trop compliqué.
- 
Côté technique aussi, nous sommes assez libres sur ce projet ; néanmoins il y a quelques éléments qu’il faut avoir en tête avant de commencer le projet :
- pour ce nouveau projet on part vraiment de zéro, tu vas donc devoir mettre en place le backend, le frontend et la base de données ;
- le projet doit être codé en JavaScript et respecter les standards WCAG ;
- il est obligatoire d’utiliser un framework front-end JavaScript. Comme on part de zéro, libre à toi d’utiliser celui que tu préfères (React, Vue, Angular…). Je te conseille d’utiliser React, mais ça reste à toi de décider ;
- pour la base de données, tu peux utiliser les outils de ton choix. Tu peux utiliser soit une base de données non relationnelle, comme mongoDB par exemple, soit une base de données relationnelle (en t’aidant d’un ORM si tu le souhaites) ;
- pense à bien fournir un README avec ton code, expliquant comment installer le site sur un nouveau poste.
