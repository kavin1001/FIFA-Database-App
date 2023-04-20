import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router";
import StatsDashboard from "../components/PlayerPageComponents/PlayerStatsTable";
import MatchesTable from "../components/MatchesPageComponents/MatchesTable";
import LeagueDropdown from "../components/MatchesPageComponents/LeagueDropdown";

const config = require('../config.json')

const matchesColumns = [
    {
        field: 'home_team_name',
        headerName: 'Home'
    },
    {
        field: 'home_team_goal',
        headerName: 'Home Goals'
    },
    {
        field: 'away_team_goal',
        headerName: 'Away Goals'
    },
    {
        field: 'away_team_name',
        headerName: 'Away'
    },
    {
        field: 'season',
        headerName: 'Season'
    },
    {
        field: 'date_date',
        headerName: 'Date'
    }
]

function MatchesPage() {
    const [league, setLeague] = useState(-1);

    const [loadedDropdown, setLoadedDropdown]  = useState(0)
    const [loadedTable, setLoadedTable]  = useState(0)

    const tableRoute = 
        league == -1 
        ? `http://${config.server_host}:${config.server_port}/api/matches/matchList`
        : `http://${config.server_host}:${config.server_port}/api/matches/matchList/${league}`
    
    return (
        <>
            {!loadedDropdown && !loadedTable ?
            <div>
                <h1 className="font-bold text-5xl my-10 text-center">Loading...</h1>
            </div>
            :
            <></>
            }
            <div 
            className = 
            {`flex items-center flex-col
            visibility: ${!loadedDropdown && !loadedTable ? 'hidden' : 'visible'}
            `}>
                <LeagueDropdown 
                    setLeague = {setLeague}
                    setLoaded = {setLoadedDropdown}
                />
                <MatchesTable                                     
                    route = {tableRoute}
                    columns = {matchesColumns}
                    league = {league}
                    setLoaded = {setLoadedTable}
                />
            </div>
        </>
    )
}

export default MatchesPage;