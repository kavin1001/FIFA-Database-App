import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router";
import StatsDashboard from "../components/PlayerPageComponents/PlayerStatsTable";

function PlayerPage() {
    
    // State variables to maintain the player api id
    const [playerAttributes, setPlayerAttributes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seasons, setSeasons] = useState([]);
    const [season, setSeason] = useState(0);
    const [levels, setLevels] = useState([]);
    let coveredYears = [];

    let { player_api_id } = useParams();

    let { player_name } = useParams();

    console.log("Player API ID on the player page is:", player_api_id);

    function getSeasons(playerData) {
        for (let i = 0; i < playerData.length; i++) {
            if (!coveredYears.includes(playerData[i].date.slice(0, 4))) {
                coveredYears.push(playerData[i].date.slice(0, 4));
                seasons.push([playerData[i].date.slice(0, 4), i]);
            }
        }
    }

    function updateLevels(seasons) {
        for (let i = 0; i < seasons.length; i++) {
            levels.push({ name: seasons[i][0], id: seasons[i][1], key: i });
        }
       
    }

    function wait() {
        setTimeout(() => {
            setLoading(false);
          }, 500);
    }

    // The route to get the player attributes
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/player/playerAttributes/${player_api_id}`)
            .then((res) => {
                console.log(res.data);
                setPlayerAttributes(res.data);
                getSeasons(res.data)
                updateLevels(seasons);
                wait();
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log("levels are:", levels)  

    return (
        loading ? 
        <div>
            <h1 className="font-bold text-5xl my-10 text-center">Loading...</h1>
        </div> :
        <div>
            <h1 className="font-bold text-5xl my-10 text-center"> {player_name}</h1>
            <StatsDashboard 
                levels={levels}
                playerAttributes={playerAttributes} 
                seasons ={seasons} 
                currSeason = {season} 
                setSeason={setSeason} 
                setLoading={setLoading}
            />
        </div>
    );
}

export default PlayerPage;