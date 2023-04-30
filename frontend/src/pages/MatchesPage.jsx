import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router";
import StatsDashboard from "../components/PlayerPageComponents/PlayerStatsTable";
import MatchesTable from "../components/MatchesPageComponents/MatchesTable";
import LeagueDropdown from "../components/MatchesPageComponents/LeagueDropdown";
import Nav from '../components/Nav';
import Datepicker from "react-tailwindcss-datepicker"; 

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
        ? `http://localhost:8080/api/matches/matchList`
        : `http://localhost:8080/api/matches/matchList/${league}`

    const dateRoute = `http://localhost:8080/api/matches/dateMatches/${dateValue.startDate}/${dateValue.endDate}`;

    return (
        <>
            <Nav />
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