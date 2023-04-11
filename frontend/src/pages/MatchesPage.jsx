import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router";
import StatsDashboard from "../components/PlayerPageComponents/PlayerStatsTable";
import MatchesTable from "../components/MatchesPageComponents/MatchesTable";

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
    return (
        <MatchesTable 
            route = {`http://${config.server_host}:${config.server_port}/api/matches/matchlist`}
            columns = {matchesColumns}
        />
    )
}

export default MatchesPage;