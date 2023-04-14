const mysql = require("mysql");
const config = require("../config.json");
const { Router } = require("express");
const teamRouter = Router();

const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
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


module.exports = {
  teamRouter,
};
