import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router";
import StatsDashboard from "../components/PlayerPageComponents/PlayerStatsTable";
import MatchesTable from "../components/MatchesPageComponents/MatchesTable";
import LeagueDropdown from "../components/MatchesPageComponents/LeagueDropdown";

const config = require('../config.json')

const matchesColumns = [
    {
        field: 'country_id',
        headerName: 'Country ID'
    },
    {
        field: 'league_id',
        headerName: 'League ID'
    },
    {
        field: 'season',
        headerName: 'Season'
    },
    {
        field: 'date',
        headerName: 'Date'
    },
    {
        field: 'home_team_api_id',
        headerName: 'Home ID'
    },
    {
        field: 'home_team_api_id',
        headerName: 'Away ID'
    },
    {
        field: 'home_team_goal',
        headerName: 'Home Goals'
    },
    {
        field: 'away_team_goal',
        headerName: 'Away Goals'
    }
]

function MatchesPage() {
    const [league, setLeague] = useState(-1);

    const tableRoute = 
        league == -1 
        ? `http://${config.server_host}:${config.server_port}/api/matches/matchlist`
        : `http://${config.server_host}:${config.server_port}/api/matches/matchList/${league}`

    console.log(tableRoute)
    
    return (
        <div className = 'flex items-center flex-col'>
            <LeagueDropdown setLeague = {setLeague}/>
            <MatchesTable 
                route = {tableRoute}
                columns = {matchesColumns}
                league = {league}
            />
        </div>
    )
}

export default MatchesPage;