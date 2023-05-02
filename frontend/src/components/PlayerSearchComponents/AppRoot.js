import React, { useState, useEffect } from "react";
import axios from "axios";
import Players from "./PlayerResults";
import Nav from "./Nav";
import Popup from "./PlayerCard";

export const AppContext = React.createContext(null);

export default function AppRoot() {
  // The players state that will be updated with the API call
  const [players, setPlayers] = useState([]);

  // Show all players
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/player/playerList")
      .then((res) => {
        setPlayers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log("Route is not working"));
  }, []);

  // State variables to keep track of the app state globally
  const [searchQuery, setSearchQuery] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [player, setPlayer] = useState();
  const [season, setSeason] = useState("0");
  const [searchTrue, setSearchTrue] = useState(false);
  const [teams, setTeams] = useState(1);

  const selectedPlayer = players.find((c) => c.player_api_id === player);

  console.log("Player is: ", player);
  console.log("Selected player is: ", selectedPlayer);
  // Functions to update the states

  // Sets the player to the state
  function choosePlayer(player) {
    setPlayer(player);
  }

  // Shows or hides the popup
  function showPopup(state) {
    setOpenPopup(state);
  }

  // Everytime the search query changes, this function will be called
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const appContextValue = {
    players,
    showPopup,
    choosePlayer,
    updateSearchQuery,
    searchQuery,
    openPopup,
    setPlayer,
    selectedPlayer,
    setSeason,
    season,
    searchTrue,
    setSearchTrue,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <Nav
        updateSearchQuery={setSearchQuery}
        searchState={searchTrue}
        setSearchState={setSearchTrue}
        setTeams={setTeams}
        teams={teams}
      />
      <Players searchString={searchQuery} teams={teams} />
      {selectedPlayer && <Popup player={selectedPlayer} />}
    </AppContext.Provider>
  );
}
