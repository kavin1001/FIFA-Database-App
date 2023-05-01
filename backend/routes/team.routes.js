const mysql = require("mysql");
const { Router } = require("express");
const teamRouter = Router();

const connection = mysql.createConnection({
  host: process.env.REACT_APP_RDS_HOST,
  user: process.env.REACT_APP_RDS_USER,
  password: process.env.REACT_APP_RDS_PASSWORD,
  port: process.env.REACT_APP_RDS_PORT,
  database: process.env.REACT_APP_RDS_DB,
 });
 
connection.connect((err) => err && console.log(err));

// Get all the teams to display on the search page
teamRouter.get("/teamList", async (req, res) => {
  connection.query(
    `
  SELECT *
  FROM Team
  `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
    }
  );
});

// Get all the attributes for a specific team
teamRouter.get("/teamAttributes/:id", async (req, res) => {
  connection.query(
    `
    SELECT *
    FROM Team_Attributes
    WHERE team_api_id = ${req.params.id}
    `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
    }
  );
});

// Get attacking players for a specific team for a given year
teamRouter.get("/teamAttributes/:id/:year", async (req, res) => {
  connection.query(
    `
      WITH Home_Team AS (
      SELECT YEAR(Matches.date) AS year, T.team_long_name, T.team_api_id AS team_api,
      H7.player_name AS player_7, H7.player_api_id AS player_7_api, P7.overall_rating AS player_7_or, H9.player_name AS player_9, H9.player_api_id AS player_9_api, P9.overall_rating AS player_9_or,
      H10.player_name AS player_10, H10.player_api_id AS player_10_api, P10.overall_rating AS player_10_or, H11.player_name AS player_11, H11.player_api_id AS player_11_api, P11.overall_rating AS player_11_or
      FROM Matches
      JOIN Team T on Matches.home_team_api_id = T.team_api_id
      JOIN Player H7 ON Matches.home_player_7 = H7.player_api_id
      JOIN Player H9 ON Matches.home_player_9 = H9.player_api_id
      JOIN Player H10 ON Matches.home_player_10 = H10.player_api_id
      JOIN Player H11 ON Matches.home_player_11 = H11.player_api_id
      JOIN Player_Attributes P7 on H7.player_api_id = P7.player_api_id
      JOIN Player_Attributes P9 on H9.player_api_id = P9.player_api_id
      JOIN Player_Attributes P10 on H10.player_api_id = P10.player_api_id
      JOIN Player_Attributes P11 on H11.player_api_id = P11.player_api_id
      WHERE YEAR(P7.date) = ${req.params.year} AND YEAR(P9.date) = ${req.params.year} AND YEAR(P10.date) = ${req.params.year} AND YEAR(P11.date) = ${req.params.year} AND team_api_id = ${req.params.id} AND YEAR(Matches.date) = ${req.params.year}
      ), Away_Team AS (
      SELECT YEAR(Matches.date) AS year, T.team_long_name, T.team_api_id AS team_api,
      H7.player_name AS player_7, H7.player_api_id AS player_7_api, P7.overall_rating AS player_7_or, H9.player_name AS player_9, H9.player_api_id AS player_9_api, P9.overall_rating AS player_9_or,
      H10.player_name AS player_10, H10.player_api_id AS player_10_api, P10.overall_rating AS player_10_or, H11.player_name AS player_11, H11.player_api_id AS player_11_api, P11.overall_rating AS player_11_or
      FROM Matches
      JOIN Team T on Matches.away_team_api_id = T.team_api_id
      JOIN Player H7 ON Matches.away_player_7 = H7.player_api_id
      JOIN Player H9 ON Matches.away_player_9 = H9.player_api_id
      JOIN Player H10 ON Matches.away_player_10 = H10.player_api_id
      JOIN Player H11 ON Matches.away_player_11 = H11.player_api_id
      JOIN Player_Attributes P7 on H7.player_api_id = P7.player_api_id
      JOIN Player_Attributes P9 on H9.player_api_id = P9.player_api_id
      JOIN Player_Attributes P10 on H10.player_api_id = P10.player_api_id
      JOIN Player_Attributes P11 on H11.player_api_id = P11.player_api_id
      WHERE YEAR(P7.date) = ${req.params.year} AND YEAR(P9.date) = ${req.params.year} AND YEAR(P10.date) = ${req.params.year} AND YEAR(P11.date) = ${req.params.year} AND team_api_id = ${req.params.id} AND YEAR(Matches.date) = ${req.params.year}
      ), Combined AS (
      SELECT *
      FROM Home_Team
      UNION
      SELECT *
      FROM Away_Team
      ), Roster AS (
      SELECT DISTINCT player_7 AS Player, player_7_api AS Player_API, player_7_or AS Player_Rating, 'Right Winger' AS Position, year AS Year
      FROM Combined
      WHERE team_api = ${req.params.id} AND year = ${req.params.year}
      UNION
      SELECT DISTINCT player_9 AS Player, player_9_api AS Player_API, player_9_or AS Player_Rating, 'Striker' AS Position, year AS Year
      FROM Combined
      WHERE team_api = ${req.params.id} AND year = ${req.params.year}
      UNION
      SELECT DISTINCT player_10 AS Player, player_10_api AS Player_API, player_10_or AS Player_Rating, 'Attacking Midfielder' AS Position, year AS Year
      FROM Combined
      WHERE team_api = ${req.params.id} AND year = ${req.params.year}
      UNION
      SELECT DISTINCT player_11 AS Player, player_11_api AS Player_API, player_11_or AS Player_Rating, 'Left Winger' AS Position, year AS Year
      FROM Combined
      WHERE team_api = ${req.params.id} AND year = ${req.params.year}
      )
      
      SELECT Player, Player_API, Position, AVG(Player_Rating) AS Avg_Overall_Rating, Year
      FROM Roster
      GROUP BY (Player_API)      
    `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
    }
  );
});

// Get all the teams with a player above a certain age
teamRouter.get("/teamFilter/:table", async (req, res) => {
  connection.query(
    `
    SELECT *
    FROM ${req.params.table}
    `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
    }
  );
});


module.exports = {
  teamRouter,
};
