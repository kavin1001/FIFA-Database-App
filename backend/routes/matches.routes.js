const mysql = require('mysql')
const { Router } = require("express");
const matchRouter = Router();

const connection = mysql.createConnection({
  host: process.env.REACT_APP_RDS_HOST,
  user: process.env.REACT_APP_RDS_USER,
  password: process.env.REACT_APP_RDS_PASSWORD,
  port: process.env.REACT_APP_RDS_PORT,
  database: process.env.REACT_APP_RDS_DB,
 });
 
connection.connect((err) => err && console.log(err));

matchRouter.get("/matchList", async (req, res) => {
  connection.query(`
  select M.id, country_id, league_id, season, stage, date AS date_date,
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
    select M.id, country_id, league_id, season, stage, date AS date_date,
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

matchRouter.get("/dateMatches/topPlayers/:startDate", async (req, res) => {
  connection.query(`
  WITH Players AS (
    SELECT M.id AS m_id, country_id, league_id, season, YEAR(M.date) AS year, M.date as date_date,
    M.home_team_api_id AS home_api, M.away_team_api_id AS away_api, home_team_goal, away_team_goal,
    PHA7.player_api_id AS p7_api, PHA7.overall_rating AS p7_or, PHA9.player_api_id AS p9_api, PHA9.overall_rating AS p9_or,
    PHA10.player_api_id AS p10_api, PHA10.overall_rating AS p10_or, PHA11.player_api_id AS p11_api, PHA11.overall_rating AS p11_or
    FROM Matches M
    JOIN Player_Attributes PHA7 on M.home_player_7 = PHA7.player_api_id
    JOIN Player_Attributes PHA9 on M.home_player_9 = PHA9.player_api_id
    JOIN Player_Attributes PHA10 on M.home_player_10 = PHA10.player_api_id
    JOIN Player_Attributes PHA11 on M.home_player_11 = PHA11.player_api_id
    WHERE DATE(M.date) >= '${req.params.startDate}' AND DATE(M.date) <= ADDDATE(DATE('${req.params.startDate}'), 31*6) AND
          DATE(PHA7.date) >= '${req.params.startDate}' AND DATE(PHA7.date) <= ADDDATE('${req.params.startDate}', 31*6) AND
          DATE(PHA9.date) >= '${req.params.startDate}' AND DATE(PHA9.date) <= ADDDATE('${req.params.startDate}', 31*6) AND
          DATE(PHA10.date) >= '${req.params.startDate}' AND DATE(PHA10.date) <= ADDDATE('${req.params.startDate}', 31*6) AND
          DATE(PHA11.date) >= '${req.params.startDate}' AND DATE(PHA11.date) <= ADDDATE('${req.params.startDate}', 31*6) 
    ), Player_Merged AS (
        SELECT DISTINCT m_id, country_id, league_id, season, year, home_api, away_api, home_team_goal, away_team_goal, p7_api AS p_api, p7_or as p_or, date_date
        FROM Players WHERE DATE(date_date) >= '${req.params.startDate}' AND DATE(date_date) <= ADDDATE(DATE('${req.params.startDate}'), 31*6)
        UNION
        SELECT DISTINCT m_id, country_id, league_id, season, year, home_api, away_api, home_team_goal, away_team_goal, p9_api AS p_api, p9_or as p_or, date_date
        FROM Players WHERE DATE(date_date) >= '${req.params.startDate}' AND DATE(date_date) <= ADDDATE(DATE('${req.params.startDate}'), 31*6)
        UNION
        SELECT DISTINCT m_id, country_id, league_id, season, year, home_api, away_api, home_team_goal, away_team_goal, p10_api AS p_api, p10_or as p_or, date_date
        FROM Players WHERE DATE(date_date) >= '${req.params.startDate}' AND DATE(date_date) <= ADDDATE(DATE('${req.params.startDate}'), 31*6)
        UNION
        SELECT DISTINCT m_id, country_id, league_id, season, year, home_api, away_api, home_team_goal, away_team_goal, p11_api AS p_api, p11_or as p_or, date_date
        FROM Players WHERE DATE(date_date) >= '${req.params.startDate}' AND DATE(date_date) <= ADDDATE(DATE('${req.params.startDate}'), 31*6)
    )
    SELECT m_id, country_id, league_id, season, year, date_date, home_api, away_api, T1.team_long_name as home_name, T2.team_long_name as away_name,
          home_team_goal, away_team_goal, p_api, P.player_name as best_home_player, MAX(p_or) AS best_home_player_overall_rating
    FROM Player_Merged
    JOIN Team T1 on home_api=T1.team_api_id
    JOIN Team T2 on away_api=T2.team_api_id
    JOIN Player P on p_api=P.player_api_id
    WHERE DATE(date_date) >= '${req.params.startDate}' AND DATE(date_date) <= ADDDATE(DATE('${req.params.startDate}'), 31*6)
    GROUP BY (home_api); 
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

matchRouter.get("/dateMatches/topPlayers/:startDate/:league", async (req, res) => {
  connection.query(`
  WITH Players AS (
    SELECT M.id AS m_id, country_id, league_id, season, YEAR(M.date) AS year, M.date as date_date,
    M.home_team_api_id AS home_api, M.away_team_api_id AS away_api, home_team_goal, away_team_goal,
    PHA7.player_api_id AS p7_api, PHA7.overall_rating AS p7_or, PHA9.player_api_id AS p9_api, PHA9.overall_rating AS p9_or,
    PHA10.player_api_id AS p10_api, PHA10.overall_rating AS p10_or, PHA11.player_api_id AS p11_api, PHA11.overall_rating AS p11_or
    FROM Matches M
    JOIN Player_Attributes PHA7 on M.home_player_7 = PHA7.player_api_id
    JOIN Player_Attributes PHA9 on M.home_player_9 = PHA9.player_api_id
    JOIN Player_Attributes PHA10 on M.home_player_10 = PHA10.player_api_id
    JOIN Player_Attributes PHA11 on M.home_player_11 = PHA11.player_api_id
    WHERE DATE(M.date) >= '${req.params.startDate}' AND DATE(M.date) <= ADDDATE(DATE('${req.params.startDate}'), 31*6) AND
          DATE(PHA7.date) >= '${req.params.startDate}' AND DATE(PHA7.date) <= ADDDATE('${req.params.startDate}', 31*6) AND
          DATE(PHA9.date) >= '${req.params.startDate}' AND DATE(PHA9.date) <= ADDDATE('${req.params.startDate}', 31*6) AND
          DATE(PHA10.date) >= '${req.params.startDate}' AND DATE(PHA10.date) <= ADDDATE('${req.params.startDate}', 31*6) AND
          DATE(PHA11.date) >= '${req.params.startDate}' AND DATE(PHA11.date) <= ADDDATE('${req.params.startDate}', 31*6) AND M.league_id=${req.params.league}
    ), Player_Merged AS (
        SELECT DISTINCT m_id, country_id, league_id, season, year, home_api, away_api, home_team_goal, away_team_goal, p7_api AS p_api, p7_or as p_or, date_date
        FROM Players WHERE DATE(date_date) >= '${req.params.startDate}' AND DATE(date_date) <= ADDDATE(DATE('${req.params.startDate}'), 31*6)
        UNION
        SELECT DISTINCT m_id, country_id, league_id, season, year, home_api, away_api, home_team_goal, away_team_goal, p9_api AS p_api, p9_or as p_or, date_date
        FROM Players WHERE DATE(date_date) >= '${req.params.startDate}' AND DATE(date_date) <= ADDDATE(DATE('${req.params.startDate}'), 31*6)
        UNION
        SELECT DISTINCT m_id, country_id, league_id, season, year, home_api, away_api, home_team_goal, away_team_goal, p10_api AS p_api, p10_or as p_or, date_date
        FROM Players WHERE DATE(date_date) >= '${req.params.startDate}' AND DATE(date_date) <= ADDDATE(DATE('${req.params.startDate}'), 31*6)
        UNION
        SELECT DISTINCT m_id, country_id, league_id, season, year, home_api, away_api, home_team_goal, away_team_goal, p11_api AS p_api, p11_or as p_or, date_date
        FROM Players WHERE DATE(date_date) >= '${req.params.startDate}' AND DATE(date_date) <= ADDDATE(DATE('${req.params.startDate}'), 31*6)
    )
    SELECT m_id, country_id, league_id, season, year, date_date, home_api, away_api, T1.team_long_name as home_name, T2.team_long_name as away_name,
          home_team_goal, away_team_goal, p_api, P.player_name as best_home_player, MAX(p_or) AS best_home_player_overall_rating
    FROM Player_Merged
    JOIN Team T1 on home_api=T1.team_api_id
    JOIN Team T2 on away_api=T2.team_api_id
    JOIN Player P on p_api=P.player_api_id
    WHERE DATE(date_date) >= '${req.params.startDate}' AND DATE(date_date) <= ADDDATE(DATE('${req.params.startDate}'), 31*6)
    GROUP BY (home_api); 
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