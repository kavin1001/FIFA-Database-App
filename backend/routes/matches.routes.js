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
  select M.id, country_id, league_id, season, stage, CAST(date AS DATE) date_date,
  home_team_api_id, away_team_api_id, home_team_goal, away_team_goal, T1.team_long_name as home_team_name, T2.team_long_name as away_team_name
  from Matches M
  join Team T1 on M.home_team_api_id = T1.team_api_id
  join Team T2 on M.away_team_api_id = T2.team_api_id;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  }); 
});

matchRouter.get("/leagueList", async (req, res) => {
  connection.query(`
  select id, name
  from League;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  }); 
});

matchRouter.get("/matchList/:league", async (req, res) => {
  connection.query(`
    select M.id, country_id, league_id, season, stage, CAST(date AS DATE) date_date,
    home_team_api_id, away_team_api_id, home_team_goal, away_team_goal, T1.team_long_name as home_team_name, T2.team_long_name as away_team_name
    from Matches M          
    join Team T1 on M.home_team_api_id = T1.team_api_id
    join Team T2 on M.away_team_api_id = T2.team_api_id
    where league_id = ${req.params.league};
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  }); 
});

matchRouter.get("/seasonMatches/:season", async (req, res) => {
  connection.query(`
    select M.id, country_id, league_id, season, stage, CAST(date AS DATE) date_date,
    home_team_api_id, away_team_api_id, home_team_goal, away_team_goal, T1.team_long_name as home_team_name, T2.team_long_name as away_team_name
    from Matches M
    join Team T1 on M.home_team_api_id = T1.team_api_id
    join Team T2 on M.away_team_api_id = T2.team_api_id
    where season = '${req.params.season}';
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  }); 
});

matchRouter.get("/dateMatches/:startDate/:endDate", async (req, res) => {
  connection.query(`
    select id, country_id, league_id, season, stage, date, home_team_api_id, away_team_api_id,
    home_team_goal, away_team_goal
    from Matches
    where date <= '${req.params.endDate}' AND date >= '${req.params.startDate}';
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