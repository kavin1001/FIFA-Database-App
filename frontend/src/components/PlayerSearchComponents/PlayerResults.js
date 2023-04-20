import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppRoot";
import Course from "./Player";
import axios from "axios";

export default function Courses(props) {
  const [listItems, setListItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(0);

  const { searchTrue } = useContext(AppContext);

  // Redifining the type of searchString from object to string
  if (typeof searchString === "object") {
    props.searchString = "";
  }

  // The global difficulty state that is set in the DifficultyFilter component
  const { courses } = useContext(AppContext);

  // Displayed courses is updated based on the search string such that the conditions are met
  const displayedCourses = courses.filter(
    (c) =>
      c.player_name.toLowerCase().indexOf(props.searchString.toLowerCase()) !==
      -1
  );

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log(page);
    console.log(`http://localhost:8080/api/player/playerLazyScroll/${page}`);
    axios
      .get(`http://localhost:8080/api/player/playerLazyScroll/${page}`)
      .then((res) => {
        const data = res.data;
        console.log("data is ", data);
        setListItems(listItems.concat(data));
      })
      .catch((err) => console.log("Route is not working", err));
  }, [page]);

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
    setPage(page + 1);
  };

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };

  if (!searchTrue) {
    return (
      <div>
        <div className="mx-auto mb-12 h-full w-5/6 items-center justify-between">
          <div className="flex flex-row justify-between">
            {/* <div>
            <SemSelector />
          </div> */}
            {/* <div>
            <DifficultyFilter />
          </div> */}
          </div>
          <div className="mt-6 grid gap-4 grid-cols-3">
            {listItems.map((c) => (
              <Course
                key={c.id}
                dept={""}
                number={c.player_api_id}
                title={c.player_name}
                description={""}
              />
            ))}
            {isFetching && <h1>Fetching more list items...</h1>}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="mx-auto mb-12 h-full w-5/6 items-center justify-between">
          <div className="flex flex-row justify-between">
            {/* <div>
            <SemSelector />
          </div> */}
            {/* <div>
            <DifficultyFilter />
          </div> */}
          </div>
          <div className="mt-6 grid gap-4 grid-cols-3">
            {displayedCourses.map((c) => (
              <Course
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
