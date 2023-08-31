# React + Vite App

# Before Getting Started

- Install Dependencies

- cd to api folder in terminal
- api > npm install

- cd to client folder in new terminal
- client > npm install

# Run server locally

- cd to api folder in terminal
- api > npm run dev

# Run react project locally

- cd to client folder in new terminal
- client > npm run dev

# Project Description

The goal of this project is to create an infinitely scrolling grid of photos. Most likely you will need to use the `useCallback` hook as a ref combined with `IntersectionObserver`. _If you are unfamiliar with `IntersectionObserver` I recommend reading my [IntersectionObserver blog article](https://blog.webdevsimplified.com/2022-01/intersection-observer)._

1. Create an infinitely scrolling grid of photos using the API.
   - The list should not break if there are no more photos to load.
   - The list should not break if the user scrolls up and down quickly.
   - The list should only load new photos when the user reaches (or gets close to) the bottom of the page.
