import React, { useState, useEffect } from "react";
import axios from "axios";
import Teams from "./TeamResults";
import Nav from "./TeamNav";
import Popup from "./TeamCard";

export const AppContext = React.createContext(null);

export default function AppRoot() {
  // The teams state that will be updated with the API call
  const [teams, setTeams] = useState([]);

  // Show all teams
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/team/teamList")
      .then((res) => {
        setTeams(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log("Route is not working"));
  }, []);

  // State variables to keep track of the app state globally
  const [searchQuery, setSearchQuery] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [team, setTeam] = useState();
  const [year, setYear] = useState("2020");
  const [semester, setSemester] = useState("C");
  const [season, setSeason] = useState("0");

  const selectedTeam = teams.find((t) => t.team_api_id === team);

  // Functions to update the states

  // Sets the course to the state
  function chooseTeam(team) {
    setTeam(team);
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
    teams,
    showPopup,
    chooseTeam,
    updateSearchQuery,
    searchQuery,
    openPopup,
    setTeam,
    selectedTeam,
    semester,
    year,
    setYear,
    setSeason,
    season,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <Nav updateSearchQuery={setSearchQuery} />
      <Teams searchString={searchQuery} />
      {selectedTeam && <Popup team={selectedTeam} />}
    </AppContext.Provider>
  );
}
