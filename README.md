# CIS-550-Final-Project

Arush Mehrotra, Spencer Mateega, Kavin Saravanan, Kevin Zhang

University of Pennsylvania

## Instructions

1. Clone the repository
2. Run `npm install` in the `frontend` and `backend` directories
3. Run `npm start` in the `frontend` directory
4. Run `node app.js` in the `backend` directory
5. Create a learner lab session and the appropriate AWS credentials in the `.env ` file in the `backend` directory
6. Add the database configuration in the `.env ` file in the `backend` directory
7. Navigate to `localhost:3000` in your browser

## Motivation

Football is the most popular sport in the world with roughly 3.5 billion fans worldwide. Yet, there is currently no way to quickly and quantitatively compare football players on both a single-player time-series basis and a multi-player cross-sectional basis.

By implementing the below features, we aim to solve this problem through a centralized dashboard that allows users to quickly query football player and team statistics.

## Required Features

- Analyze the yearly progression (time-series) of a single player across various attributes (i.e., overall rating, shooting, dribbling).
- Compare multiple players (cross-section) across various attributes (i.e., overall rating, shooting, dribbling).
- Compare multiple teams within the Premier League, La Liga, and Ligue 1 across multiple seasons (time-series, cross-section) and attributes.
- Drop-down filters to filter player and team attributes.
- Search bar to search for players and teams.

## Potential Features

- Visualization of comparisons (graphs and charts).
- User profiles to allow users to save players and teams to a “favorites” list.

## Application Pages

- Match page
  - Brief description of our project and the relevant use cases; Navigation to other pages
- Player page
  - Allow users to query the different players and see their player statistics (speed, dribbling, etc.)
  - Allow users to select different seasons that data exists in our datasets
  - Allow users to compare different players
- Team page
  - Search and filter for teams; Compare teams across various attributes; See aggregate stats of all the players on the team.
  - Compare teams across various statistics
  - Show game statistics for the games the team has played, allow filtering over different seasons that we have data for
- (potential) User profile page
  - Brief user profile (name, email) and the user’s favorite players and/or teams.
  - Other saved statistics that the player may have stored in previous session (session storage/preservation)

## Technology Stack

- Front end: TailwindCSS, React, Data Visualization Libraries
- Back end: Node/Express, Axios, SQL (MySQL), AWS RDS, Auth0
