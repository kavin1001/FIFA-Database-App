const mysql = require("mysql");
const { Router } = require("express");
const dbRouter = Router();

const connection = mysql.createConnection({
  host: process.env.REACT_APP_RDS_HOST,
  user: process.env.REACT_APP_RDS_USER,
  password: process.env.REACT_APP_RDS_PASSWORD,
  port: process.env.REACT_APP_RDS_PORT,
  database: process.env.REACT_APP_RDS_DB,
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

module.exports = {
  dbRouter,
};
