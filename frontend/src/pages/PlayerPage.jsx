import axios from "axios";
import React, {useEffect, useState} from "react";
import { useParams } from "react-router";

function PlayerPage() {
    
    // State variables to maintain the player api id
    const [playerAttributes, setPlayerAttributes] = useState([]);
    
    let { player_api_id } = useParams();

    console.log("Player API ID on the player page is:", player_api_id);


    // The route to get the player attributes
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/player/playerAttributes/${player_api_id}`)
            .then((res) => {
                setPlayerAttributes(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (
        <div>
            <h1>Player</h1>
        </div>
    );
}

export default PlayerPage;