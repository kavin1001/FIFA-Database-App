import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router";
import StatsDashboard from "../components/PlayerPageComponents/PlayerStatsTable";
import MatchesTable from "../components/MatchesPageComponents/MatchesTable";
import LeagueDropdown from "../components/MatchesPageComponents/LeagueDropdown";
import Datepicker from "react-tailwindcss-datepicker"; 


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
    const [loadedDropdown, setLoadedDropdown]  = useState(0)
    const [loadedTable, setLoadedTable]  = useState(0)
    const [dateValue, setDateValue] = useState({
        startDate: '2008-08-08', 
        endDate: '2016-05-26'
    });

    const handleDateValueChange = (newDateValue) => {
        console.log("newDateValue:", newDateValue); 
        setDateValue(newDateValue); 
    }
    
    const leagueRoute = 
        league == -1 
        ? `http://${config.server_host}:${config.server_port}/api/matches/matchlist`
        : `http://${config.server_host}:${config.server_port}/api/matches/matchList/${league}`

    const dateRoute = `http://${config.server_host}:${config.server_port}/api/matches/dateMatches/${dateValue.startDate}/${dateValue.endDate}`;

    return (
        <>
            {!loadedDropdown || !loadedTable ?
            <div>
                <h1 className="font-bold text-5xl my-10 text-center">Loading...</h1>
            </div>
            :
            <></>
            }
            <div 
            className = 
            {`flex items-center flex-col
            visibility: ${loadedDropdown && loadedTable ? 'visible': 'hidden'}
            `}>
                <LeagueDropdown 
                    setLeague = {setLeague}
                    setLoaded = {setLoadedDropdown}
                />
                <div className = 'w-96'>
                    <Datepicker 
                        value={dateValue} 
                        onChange={handleDateValueChange} 
                        useRange={false}
                        maxDate={new Date()}
                    /> 
                </div>
                <MatchesTable 
                // NEED TO CHANGE PROCESSING HERE
                    leagueRoute = {leagueRoute}
                    dateRoute = {dateRoute}
                    columns = {matchesColumns}
                    startDate = {dateValue.startDate}
                    endDate = {dateValue.endDate}
                    setLoaded = {setLoadedTable}
                />
            </div>
        </>
    )
}

export default MatchesPage;