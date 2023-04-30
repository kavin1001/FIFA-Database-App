const mysql = require("mysql");
const { Router } = require("express");
const playerRouter = Router();

const connection = mysql.createConnection({
  host: process.env.REACT_APP_RDS_HOST,
  user: process.env.REACT_APP_RDS_USER,
  password: process.env.REACT_APP_RDS_PASSWORD,
  port: process.env.REACT_APP_RDS_PORT,
  database: process.env.REACT_APP_RDS_DB,
 });
 
connection.connect((err) => err && console.log(err));

// Get all the players to display on the search page
playerRouter.get("/playerList", async (req, res) => {
  connection.query(
    `
  SELECT *
  FROM Player
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

// Get all the attributes for a specific player
playerRouter.get("/playerAttributes/:id", async (req, res) => {
  connection.query(
    `
    SELECT *
    FROM Player_Attributes
    WHERE player_api_id = ${req.params.id}
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

playerRouter.get("/playerLazyScroll/:page", async (req, res) => {
  connection.query(
    `
  SELECT *
  FROM Player
  LIMIT 100 OFFSET ${req.params.page * 100}
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
}
);

module.exports = {
  playerRouter,
};
