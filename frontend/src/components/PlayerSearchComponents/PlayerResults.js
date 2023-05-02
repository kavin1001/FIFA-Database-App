import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppRoot";
import Player from "./Player";
import axios from "axios";

export default function Players(props) {
  const [listItemsStandard, setListItemsStandard] = useState([]);
  const [listItemsTeams, setListItemsTeams] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [pageStandard, setPageStandard] = useState(0);
  const [pageTeams, setPageTeams] = useState(0);
  const [mode, setMode] = useState(0);

  const teams = props.teams;

  const { searchTrue } = useContext(AppContext);

  // Redifining the type of searchString from object to string
  if (typeof searchString === "object") {
    props.searchString = "";
  }

  // The global players state
  const { players } = useContext(AppContext);

  // Displayed players is updated based on the search string such that the conditions are met
  const displayedPlayers = players.filter(
    (c) =>
      c.player_name.toLowerCase().indexOf(props.searchString.toLowerCase()) !==
      -1
  );

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if(teams == 1) {
      setMode(0);
      setPageStandard(0);
      axios
      .get(`http://localhost:8080/api/player/playerLazyScroll/${pageStandard}`)
      .then((res) => {
        const data = res.data;
        setListItemsStandard(data);
      })
      .catch((err) => console.log("Route is not working", err));
    } else {
      setMode(1);
      setPageTeams(0);
      axios
      .get(`http://localhost:8080/api/player/playerLazyScroll/${teams}/${pageTeams}`)
      .then((res) => {
        const data = res.data;
        console.log("data is ", data);
        setListItemsTeams(data);
      })
    }
  }, [teams])

  useEffect(() => {
    if(teams == 1) {
      setMode(0);
      axios
      .get(`http://localhost:8080/api/player/playerLazyScroll/${pageStandard}`)
      .then((res) => {
        const data = res.data;
        console.log("data is ", data);
        setListItemsStandard(listItemsStandard.concat(data));
      })
      .catch((err) => console.log("Route is not working", err));
    }
    else {
      setMode(1);
      axios
      .get(`http://localhost:8080/api/player/playerLazyScroll/${teams}/${pageTeams}`)
      .then((res) => {
        const data = res.data;
        console.log("data is ", data);
        setListItemsTeams(listItemsTeams.concat(data));
      })
      .catch((err) => console.log("Route is not working", err));
    }
  }, [pageStandard, pageTeams]);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
    console.log(isFetching);
  };

  const fetchData = () => {
    mode === 0 ?
      setPageStandard(pageStandard + 1)
    :
      setPageTeams(pageTeams + 1)
  };

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };

  if (!searchTrue) {
    return (
      <div>
        <div className="mx-auto mb-12 h-full w-5/6 items-center justify-between">
          <div className="mt-6 grid gap-4 grid-cols-3">
            {
            mode === 0 ?
              listItemsStandard.map((c) => (
                <Player
                  key={c.id}
                  dept={""}
                  number={c.player_api_id}
                  title={c.player_name}
                  description={""}
                />
              ))
              :
              listItemsTeams.map((c) => (
                <Player
                  key={c.id}
                  dept={""}
                  number={c.player_api_id}
                  title={c.player_name}
                  description={""}
                />
              ))
            }
            {isFetching && <h1>Fetching more list items...</h1>}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="mx-auto mb-12 h-full w-5/6 items-center justify-between">
          <div className="mt-6 grid gap-4 grid-cols-3">
            {displayedPlayers.map((c) => (
              <Player
                key={c.id}
                dept={""}
                number={c.player_api_id}
                title={c.player_name}
                description={""}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
