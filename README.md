<p align="center">
<img src="https://github.com/JoaoGabriel-Lima/notemock_website/blob/main/logo.jpg" alt="logo">
</p>
</p>

<p align="center">
<img src="https://img.shields.io/badge/-beta-gold">
<img alt="Languages" src="https://img.shields.io/badge/languages available -1-ffdb56">
<a href="https://github.com/JoaoGabriel-Lima/SingWatch/issues" target="_blank"><img alt="Issues" src="https://img.shields.io/github/issues/JoaoGabriel-Lima/SingWatch?color=ff5c5c"></a>
<a href="https://github.com/JoaoGabriel-Lima/SingWatch/blob/main/LICENSE.md" target="_blank"><img alt="License" src="https://img.shields.io/github/license/JoaoGabriel-Lima/SingWatch?color=37bf5d"></a>
<img src="https://img.shields.io/github/checks-status/JoaoGabriel-Lima/SingWatch/main">
<img src="https://img.shields.io/github/languages/top/JoaoGabriel-Lima/SingWatch">
<a href="https://discord.gg/A8QpetRAmS" target="_blank"><img alt="Discord" src="https://img.shields.io/discord/723176618159243284?color=ff6485"></a>
</p>

## About this Project

The idea of the Website is:

_"A lyrics fetcher website that lets you sync songs from discord server with Hydra music bot"._

**PS:** The site is not just for discord users, but for any audience interested in a lyrics' fetcher. All code within this site can be reused in any lyrics project or other projects inside this context!

## Why?

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure, or anything that you can report that could make me a better developer!

Email-me: jg.limamarinho202@gmail.com

Contact me at [Twitter](https://twitter.com/juaozin__).

Also, you can use this Project as you wish, be for study, be for make improvements or earn money with it!

It's free!

## Some Observations about this App

1 – There are still several functions to be made available in the following versions of the application, like more platforms for synchronization and lyrics time sync.

2 – This app also is linked with a [discord bot](https://github.com/JoaoGabriel-Lima/singwatchbot) and a [node.js backend](https://github.com/JoaoGabriel-Lima/SingWatch-Backend).

## Testing

If you want to test this Website in the Production mode, the website links are listed below:

[Current Production Deployment](https://sing-watch.vercel.app/)

Test Deployments: Soon!

## Functionalities

- Get the lyrics of any music posted on Spotify or Deezer
- Synchronize the music with your discord server and get the lyrics with the time

## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment to run a Next.js App, that can be found [here](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website).

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/JoaoGabriel-Lima/SingWatch

$ cd SingWatch
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

### Preparing for running

1 – This site uses Next.js serverless functions to make connections to the backend socket and lyrics API.

2 – After cloning the repository, go to the [/.env.development](https://github.com/JoaoGabriel-Lima/SingWatch/blob/main/.env.development) file and edit the `MONGODB_URI`, `MONGO_DB`, `NEXT_PUBLIC_SOCKET_URL`, `GENIUS_API` and `MUSIC_INFO_URI` according to your own information.

3 - You also need to read the [discord bot](https://github.com/JoaoGabriel-Lima/singwatchbot) and [node.js backend](https://github.com/JoaoGabriel-Lima/SingWatch-Backend) readme before start coding.

### Running

With all dependencies installed, and the environment properly configured, you can now run the website:

yarn

```
$ yarn run dev
```

npm

```
$ npm run dev
```

The website will start on the default port 3000

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/) - The React Framework  
  for Production
- [Axios](https://github.com/axios/axios) - HTTP Client
- [ESlint](https://eslint.org/) - Linter
- [Dotenv](https://github.com/motdotla/dotenv) - Configs from .env file
- [MongoDB](https://www.mongodb.com/) - Distributed Database
- [Prettier](https://prettier.io/) - Code Formatter
- [Babel](https://babeljs.io/) - JavaScript Compiler
- [Styled-Components](https://www.styled-components.com/) - Styles
- [react-icons](https://react-icons.github.io/react-icons/) - Icons Library
- [genius-lyrics-api](https://www.npmjs.com/package/genius-lyrics-api) - Lyrics fetcher
- [TailwindCSS](https://tailwindcss.com/) - CSS framework

## Support tools

- [Vercel](https://vercel.com/) - Host Service

## Contributing

You can send me as many PR's as you want, I would be glad to analyze and accept them! And if you have any question about the project…

Email-me: jg.limamarinho202@gmail.com

Contact me at [Twitter](https://twitter.com/juaozin__).

Thank you!

## License

This project is licensed under the MIT License – see the [LICENSE.md](https://github.com/JoaoGabriel-Lima/notemock_website/blob/main/LICENSE) file for details
