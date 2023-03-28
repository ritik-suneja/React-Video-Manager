# React Video Manager

React Video Manager is a web application that allows users to manage and categorize videos and audio files. Users can create, edit, and delete cards containing a name and a video or audio link. These cards can be organized into custom-named buckets, and users can view their play history.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tech Stack

- Frontend: React, Redux, React Router, Ant Design, Redux Thunk
- Backend: JSON Server

## Prerequisites

- Node.js (v12.x or higher)
- npm (v6.x or higher)

## Installation

1. Clone the repository:
use git clone 
cd react-video-manager


2. Install dependencies:
npm install


3. Start the JSON Server (backend):
node server.js


4. In a separate terminal, start the React development server (frontend):
npm start


The app will open in your default web browser at [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Features

- Create, edit, and delete cards with a name and a video or audio link
- Organize cards into custom-named buckets
- Move cards between buckets
- Play videos or audio files in a modal with an iframe
- Delete single or multiple cards at once
- View play history with the card name, link, and time played

