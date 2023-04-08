const mysql = require("mysql");
const config = require("../config.json");
const { Router } = require("express");
const dbRouter = Router();

const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
});
connection.connect((err) => err && console.log(err));

// Test query to make sure connection to the database works

dbRouter.get("/countryList", async (req, res) => {
  connection.query(
    `
    SELECT *
    FROM Country
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

dbRouter.get("/playerList", async (req, res) => {
  connection.query(
    `
  SELECT *
  FROM Player
  LIMIT 100
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
  dbRouter,
};
