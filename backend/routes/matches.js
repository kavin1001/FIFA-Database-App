const mysql = require('mysql')
const config = require('../config.json')
const { Router } = require("express");
const matchRouter = Router();

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
  });
connection.connect((err) => err && console.log(err));

matchRouter.get("/matchList", async (req, res) => {
    connection.query(`
    select id, country_id, league_id, season, stage, date, 
    home_team_api_id, away_team_api_id, home_team_goal, away_team_goal
    from Matches;
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
    }); 
});

// Need to edit below, just mapping out routes first
matchRouter.get("/leagueMatches", async (req, res) => {
  connection.query(`
    select id, country_id, league_id, season, stage, date, home_team_api_id, away_team_api_id,
    home_team_goal, away_team_goal
    from Matches
    where league_id = 1;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  }); 
});

matchRouter.get("/seasonMatches", async (req, res) => {
  connection.query(`
    select id, country_id, league_id, season, stage, date, home_team_api_id, away_team_api_id,
    home_team_goal, away_team_goal
    from Matches
    where season = '2009/2010';
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  }); 
});

matchRouter.get("/dateMatches", async (req, res) => {
  connection.query(`
    select id, country_id, league_id, season, stage, CAST(date AS DATE) date_date, home_team_api_id, away_team_api_id,
    home_team_goal, away_team_goal
    from Matches
    where CAST(date as DATE) < '2009-03-10' AND CAST(date as DATE) > '2009-03-01';
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  }); 
});

module.exports = {
    matchRouter
}