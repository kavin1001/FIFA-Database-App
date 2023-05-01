import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router";
import StatsDashboard from "../components/PlayerPageComponents/PlayerStatsTable";
import MatchesTable from "../components/MatchesPageComponents/MatchesTable";
import LeagueDropdown from "../components/MatchesPageComponents/LeagueDropdown";
import Nav from '../components/Nav';
import Datepicker from "react-tailwindcss-datepicker"; 
import Loading from "../components/loading";

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

const matchesTopPlayerColumns = [
    {
        field: 'home_name',
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
        field: 'away_name',
        headerName: 'Away'
    },
    {
        field: 'season',
        headerName: 'Season'
    },
    {
        field: 'date_date',
        headerName: 'Date'
    },
    {
        field: 'best_home_player',
        headerName: 'Top Home Attacker'
    },
    {
        field: 'best_home_player_overall_rating',
        headerName: 'Player Rating'
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
    const [topPlayer, setTopPlayer] = useState(false);

    const handleDateValueChange = (newDateValue) => {
        if (topPlayer) {
            setDateValue({endDate: '2016-05-26', startDate: newDateValue.startDate})
        } else {
            setDateValue(newDateValue); 
        }
        console.log("newDateValue:", dateValue); 
    }
    
    const leagueRoute = 
        league == -1 
        ? `http://localhost:8080/api/matches/matchList`
        : `http://localhost:8080/api/matches/matchList/${league}`

    const dateRoute = `http://localhost:8080/api/matches/dateMatches/${dateValue.startDate}/${dateValue.endDate}`;

    const topPlayerRoute = 
    league == -1 
        ? `http://localhost:8080/api/matches/dateMatches/topPlayers/${dateValue.startDate}`
        : `http://localhost:8080/api/matches/dateMatches/topPlayers/${dateValue.startDate}/${league}`

    function handleClick() {
        console.log(topPlayer);
        setTopPlayer(!topPlayer);
    }

    return (
        <>
            <Nav />
            {!loadedDropdown || !loadedTable ?
            <div class="flex h-screen items-center justify-center">
               <Loading/>
            </div>
            :
            <></>
            }
            <div 
            className = 
            {`flex items-center flex-col
            visibility: ${loadedDropdown && loadedTable ? 'visible': 'hidden'}
            `}>
                <div className='flex my-4'>
                    <LeagueDropdown 
                        setLeague = {setLeague}
                        setLoaded = {setLoadedDropdown}
                    />
                    <div className='py-1 px-4'>
                        <input
                            class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] 
                            bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 
                            before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] 
                            after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 
                            after:rounded-full after:border-none after:bg-neutral-100 
                            after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] 
                            after:transition-[background-color_0.2s,transform_0.2s] 
                            after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] 
                            checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 
                            checked:after:w-5 checked:after:rounded-full checked:after:border-none 
                            checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] 
                            checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 
                            focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] 
                            focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] 
                            focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] 
                            checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 
                            checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
                            dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary 
                            dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault" 
                            onClick={handleClick}
                        />
                        <label class="inline-block pl-[0.15rem] hover:cursor-pointer" for="flexSwitchCheckDefault">
                            Top Home Attackers
                        </label>
                    </div>
                </div>
                <div className='w-96 border-2 rounded-lg my-4'>
                    <Datepicker 
                        value={dateValue} 
                        onChange={handleDateValueChange} 
                        useRange={false}
                        maxDate={new Date()}
                        asSingle={topPlayer ? true : false}
                    /> 
                </div>
                {topPlayer && (
                    <h1 className="text-sm font-sans font-bold">
                        (Matches For 6 Months After...)
                    </h1>
                )}
                <div className='my-4 mx-4'>
                    <MatchesTable
                        leagueRoute = {leagueRoute}
                        dateRoute = {dateRoute}
                        columns = {matchesColumns}
                        topPlayerColumns = {matchesTopPlayerColumns}
                        startDate = {dateValue.startDate}
                        endDate = {dateValue.endDate}
                        setLoaded = {setLoadedTable}
                        topPlayer = {topPlayer}
                        topPlayerRoute = {topPlayerRoute}
                    />
                </div>
            </div>
        </>
    )
}

export default MatchesPage;