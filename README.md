<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/iWilli26/Taverne-de-l-Imaginaire">
    <img src="src\assets\dragon.jpg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Taverne de l'imaginaire</h3>

  <p align="center">
    <br />
    <br />
    <a href="https://github.com/iWilli26/Taverne-de-l-Imaginaire">View Demo</a>
    ·
    <a href="https://github.com/iWilli26/Taverne-de-l-Imaginaire/issues">Report Bug</a>
    ·
    <a href="https://github.com/iWilli26/Taverne-de-l-Imaginaire/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Ce projet est un site web pour l'asociation de jeux de société "La Taverne de l'Imaginaire" de l'Institut Mines-Télécom Nord Europe. Il a été réalisé dans le cadre d'un projet ouvert de développeur web et web mobile.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

-   [![Vue][vue.js]][vue-url]
-   [![Vite][vite.js]][vite-url]
-   [![node][node.js]][node-url]
-   [![express][express.js]][express-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

-   npm
    ```sh
    npm install npm@latest -g
    ```
-   postgresql with Linux
    ```sh
    sudo apt install postgresql postgresql-contrib
    ```
-   postgresql with Windows
    ```sh
    https://www.postgresql.org/download/windows/
    ```
    pgAdmin 4 is recommended

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/iWilli26/Taverne-de-l-Imaginaire.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Create a database with pgAdmin 4
4. Import the db.sql to the database with pgAdmin 4
5. Create a .env file in the root folder and add the following lines

    ```sh
    PORT = 8080

    JWT_SECRET_KEY = WhaterverYouWant

    TOKEN_HEADER_KEY = SomethingSomething
    ```

6. Run the server
    ```sh
    npm start
    ```
7. Run the client
    ```sh
    npx vite --port=4000
    ```
8. Open the client on http://localhost:4000/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Architecture

### BDD

(faudrait juste mettre une image)

### Back

Le Back se compose de différents dossier ayant chacun son utilité:

1. Le conf_back.json permet d'indiquer le chemin et le compte vers la Base Donnée

2. server.js va faire le liens entre les routes et le Back

3. Le dossier "routes" contient un fichier par table dans la base de données et chaque fichier indique l'url et la fonction qui sera lancer lord d'un appel.

4. Le dossier "controllers" contient un fichier par table dans la base de données et chaque fichier contient les fonctions utilisé lors des appels.

### Front

1. "Views" contient les différentes pages du site web
2. "Components" contient des élements utilisé par les pages du site web. Chaque élément est réutilisable sur différentes pages.

(Je te laisse faire le reste je vois pas quoi dire de plus)

## Usage

This website is used to manage the association "La Taverne de l'Imaginaire" of the Institut Mines-Télécom Nord Europe. It allows to manage the members, the events and the games of the association.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

William - [@iWilli26](https://twitter.com/willi_ng)
<br />
Discord : iWilli#2097
<br />
<br />
Alexis - [@poirotman]
<br />
Discord : poirotman
#7071

Project Link: [https://github.com/iWilli26/Taverne-de-l-Imaginaire](https://github.com/iWilli26/Taverne-de-l-Imaginaire)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## TO DO LIST

1. Il faudrait finir principalement l'implémantation d'images en Base de Donnée et les afficher dans les pages web.
2. Faire une réunion avec l'association de Lille pour avoir un avis sur le site.
3. Revoir le design du site afin qu'il soit plus jolie et ergonomique
4. Revoir la partie sécurité afin de s'assurer de sa viabilité et l'améliorer sinon
5. Créer un journal de log afin d'avoir un aspect de supervision
6. Enregistrer les jeux dans la Base de Donnée.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/iWilli26/Taverne-de-l-Imaginaire.svg?style=for-the-badge
[contributors-url]: https://github.com/iWilli26/Taverne-de-l-Imaginaire/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/iWilli26/Taverne-de-l-Imaginaire.svg?style=for-the-badge
[forks-url]: https://github.com/iWilli26/Taverne-de-l-Imaginaire/network/members
[stars-shield]: https://img.shields.io/github/stars/iWilli26/Taverne-de-l-Imaginaire.svg?style=for-the-badge
[stars-url]: https://github.com/iWilli26/Taverne-de-l-Imaginaire/stargazers
[issues-shield]: https://img.shields.io/github/issues/iWilli26/Taverne-de-l-Imaginaire.svg?style=for-the-badge
[issues-url]: https://github.com/iWilli26/Taverne-de-l-Imaginaire/issues
[license-shield]: https://img.shields.io/github/license/iWilli26/Taverne-de-l-Imaginaire.svg?style=for-the-badge
[license-url]: https://github.com/iWilli26/Taverne-de-l-Imaginaire/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[vite.js]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vitejs.dev/
[node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org
[express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com
