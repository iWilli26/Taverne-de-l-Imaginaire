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
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a website for a role playing game club. It is a website where you can find all the information about the club, the games, the events, the rules, the contact information, etc.

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

## Usage

This website is used to manage the association "La Taverne de l'Imaginaire" of the Institut Mines-Télécom Nord Europe. It allows to manage the members, the events and the games of the association.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Documentation

### Backend

The backend is done with Node.js and Express.js. Each table of the database is represented by a router and a controller. The routes are used to manage the requests from the client. The controllers are used to manage the requests from the routes. To connect to the database, we use the pg module. The authentication is done with jsonwebtoken. The password are hashed with bcrypt. To create a new function, you have to create a new router and a new controller or use an existing controller. Then, you have to import the router in the server.js file and add the route in your router file.
We created 2 stores : game and user. in userStore, you can find the functions to login and register and also an isLogged and isAdmin boolean. In gameStore, you can find a games array containing all the games of the database.

### Frontend

The frontend is done with Vue.js and Vite.js. We also use Element-plus for the design. The components are in the components folder and import them into your views to use them. The pages are in the views folder. The router is in the router folder. To create a new page, you have to create a new view in the views folder and add its route into the router. To create a new route, you have to add the route in the index.js file.

The frontend is divided in 3 parts : the public part, the member part and the admin part. The public part is used to display the events and the games. The member part is used to display the events and the games, to manage the user's profile and also to borrow games. The admin part is used to display the events and the games and to manage the users, the events and the games. You can access the admin menu in the navbar **only** if you are an admin. (contact us a message to be an admin or have access to an admin account)

### Database

<img src="public\MCD_MLD.drawio.png" alt="Database" width="800" height="400">

## What remains to be done

-   Home page with the next events using the event table
-   Contact page
-   My profile page with the option to edit and delete the user
-   Redirect after login or register
-   Catalogue page needs to be improved
-   Events table in admin page
-   Fill the database with games and events
-   There is a jsonwebtoken authentication but it is not used yet because i dont kno how to alert the user when his token is expired. So for now, the user is not logged out when his token is expired. (use axiosPrivate to fetch data only if the token is valid and axiosPublic if the token is not needed)
-   Add images to the games in database and display them in the catalogue page + admin page
-   Recontact Lille and Douai association to know what they want to do with the website
-   Improve design
-   Improve Security
-   Create a log

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

Promo FISE23 William - [@iWilli26](https://twitter.com/willi_ng)
<br />
Discord : iWilli#2097
<br />
<br />
Promo FISE23 Alexis - [@poirotman]
<br />
Discord : poirotman
#7071

Project Link: [https://github.com/iWilli26/Taverne-de-l-Imaginaire](https://github.com/iWilli26/Taverne-de-l-Imaginaire)
<br />
_Special thanks to [Alexandre Lam](https://github.com/alexandrelam) and [Victor Deliege](https://github.com/Meltical)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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
