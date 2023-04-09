const mysql = require("mysql");
const config = require("../config.json");
const { Router } = require("express");
const playerRouter = Router();

const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
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

module.exports = {
  playerRouter,
};
